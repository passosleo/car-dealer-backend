import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { SendRecoverPasswordRequestDTO } from '../../../../infra/admin/auth/http/dtos/send-recover-password-request-dto';
import { UserPasswordRecoverAttempt } from '../../../../domain/admin/users/entities/user-password-recover-attempt-entity';
import { DateHelper } from '../../../../infra/shared/helpers/date-helper';
import { User } from '../../../../domain/admin/users/entities/user-entity';
import { IMailService } from '../../../shared/services/mail-service';
import { IEncryptionService } from '../../../shared/services/encryption-service';
import { CONFIG } from '../../../../infra/shared/constants/config';
import { IUserRepository } from '../../../../domain/admin/users/repositories/user-repository';
import { IUserPasswordRecoverAttemptRepository } from '../../../../domain/admin/users/repositories/user-password-recover-attempt-repository';

export class SendRecoverPasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userPasswordRecoverAttemptRepository: IUserPasswordRecoverAttemptRepository,
    private readonly mailService: IMailService,
    private readonly encryptionService: IEncryptionService,
  ) {}

  private readonly MAX_ATTEMPTS = 5;
  private readonly TIME_INTERVAL_SECONDS = 45;
  private readonly TIME_BLOCK_MINUTES = 10;

  public async execute(data: SendRecoverPasswordRequestDTO): Promise<void> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');

    const userPasswordRecoverAttempt = await this.userPasswordRecoverAttemptRepository.findByUserId(user.userId);

    const recoverPasswordToken = this.encryptionService.encrypt({
      userId: user.userId,
      expiresAt: DateHelper.calculateExpiration({ minutes: 10 }),
    });

    if (!userPasswordRecoverAttempt) {
      await this.userPasswordRecoverAttemptRepository.create(
        UserPasswordRecoverAttempt.create({
          userId: user.userId,
          attemptCount: 1,
          lastAttemptAt: new Date(),
          blockedUntil: null,
        }),
      );
      return this.sendRecoveryEmail(recoverPasswordToken, user);
    }

    if (userPasswordRecoverAttempt.blockedUntil && new Date() < userPasswordRecoverAttempt.blockedUntil) {
      const remainingBanTimeInMinutes = DateHelper.calculateRemainingTime(
        userPasswordRecoverAttempt.blockedUntil,
        'minutes',
      );
      throw new HttpException(
        HttpStatus.FORBIDDEN,
        `User is temporarily blocked. Please try again in ${remainingBanTimeInMinutes} minutes.`,
      );
    }

    if (userPasswordRecoverAttempt.blockedUntil && new Date() >= userPasswordRecoverAttempt.blockedUntil) {
      await this.userPasswordRecoverAttemptRepository.update(userPasswordRecoverAttempt.attemptId, {
        attemptCount: 1,
        lastAttemptAt: new Date(),
        blockedUntil: null,
      });
      return this.sendRecoveryEmail(recoverPasswordToken, user);
    }

    const { seconds: secondsSinceLastAttempt } = DateHelper.dateDifference(
      new Date(),
      userPasswordRecoverAttempt.lastAttemptAt,
    );
    if (secondsSinceLastAttempt < this.TIME_INTERVAL_SECONDS) {
      const remainingSeconds = Math.floor(this.TIME_INTERVAL_SECONDS - secondsSinceLastAttempt);
      throw new HttpException(
        HttpStatus.TOO_MANY_REQUESTS,
        `You must wait ${remainingSeconds} seconds before trying again.`,
      );
    }

    const updatedAttemptCount = userPasswordRecoverAttempt.attemptCount + 1;

    if (updatedAttemptCount > this.MAX_ATTEMPTS) {
      const blockTime = this.TIME_BLOCK_MINUTES * 60000;
      const blockedUntil = new Date(Date.now() + blockTime);
      await this.userPasswordRecoverAttemptRepository.update(userPasswordRecoverAttempt.attemptId, {
        attemptCount: updatedAttemptCount,
        lastAttemptAt: new Date(),
        blockedUntil,
      });
      const remainingBanTimeMinutes = Math.floor((blockedUntil.getTime() - new Date().getTime()) / 60000);
      throw new HttpException(
        HttpStatus.FORBIDDEN,
        `Too many attempts. Your account has been temporarily blocked. Please try again in ${remainingBanTimeMinutes} minutes.`,
      );
    }

    await this.userPasswordRecoverAttemptRepository.update(userPasswordRecoverAttempt.attemptId, {
      attemptCount: updatedAttemptCount,
      lastAttemptAt: new Date(),
      blockedUntil: null,
    });

    return this.sendRecoveryEmail(recoverPasswordToken, user);
  }

  private async sendRecoveryEmail(token: string, { email, firstName }: User) {
    const resetLink = `${CONFIG.app.baseUrl}${CONFIG.redirects.recoverPassword}?token=${encodeURIComponent(token)}`;

    await this.mailService.sendMail({
      to: email,
      subject: 'Password recovery',
      template: 'recover-password',
      data: { firstName, resetLink },
    });
  }
}
