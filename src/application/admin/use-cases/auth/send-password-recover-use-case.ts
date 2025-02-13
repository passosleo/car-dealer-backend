import { IUserRepository } from '../../../../domain/admin/repositories/user-repository';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { IUserPasswordRecoverAttemptRepository } from '../../../../domain/admin/repositories/user-password-recover-attempt-repository';
import { SendRecoverPasswordRequestDTO } from '../../../../infra/admin/http/dtos/auth/send-recover-password-request-dto';
import { UserPasswordRecoverAttempt } from '../../../../domain/admin/entities/user-password-recover-attempt-entity';
import { DateHelper } from '../../../../infra/shared/helpers/date-helper';
import { User } from '../../../../domain/admin/entities/user-entity';
import { IMailService } from '../../../shared/services/mail-service';
import { IEncryptionService } from '../../../shared/services/encryption-service';
import { CONFIG } from '../../../../infra/shared/config';

export class SendRecoverPasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userPasswordRecoverAttemptRepository: IUserPasswordRecoverAttemptRepository,
    private readonly mailService: IMailService,
    private readonly encryptionService: IEncryptionService,
  ) {}

  private readonly MAX_ATTEMPTS = 5;
  private readonly TIME_INTERVAL_SECONDS = 45;
  private readonly TIME_BLOCKED_MINUTES = 10;

  public async execute(data: SendRecoverPasswordRequestDTO): Promise<void> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');

    const userPasswordRecoverAttempt = await this.userPasswordRecoverAttemptRepository.findByUserId(user.userId);

    if (!userPasswordRecoverAttempt) {
      await this.userPasswordRecoverAttemptRepository.create(
        UserPasswordRecoverAttempt.create({
          userId: user.userId,
          attemptCount: 1,
          lastAttemptAt: new Date(),
          blockedUntil: null,
        }),
      );
      return this.sendRecoveryEmail(user);
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
      return this.sendRecoveryEmail(user);
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
      const blockTime = this.TIME_BLOCKED_MINUTES * 60000;
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

    return this.sendRecoveryEmail(user);
  }

  private async sendRecoveryEmail(user: User) {
    const { userId, firstName, lastName, email } = user;

    const recoverPasswordToken = this.encryptionService.encrypt({
      userId,
      expiresAt: DateHelper.calculateExpiration({ minutes: 10 }),
    });

    const resetLink = `${CONFIG.app.baseUrl}${
      CONFIG.redirects.recoverPassword
    }?token=${encodeURIComponent(recoverPasswordToken)}`;

    await this.mailService.sendMail({
      to: email,
      subject: 'Password recovery',
      template: 'recover-password',
      data: { fullName: `${firstName} ${lastName}`, resetLink },
    });
  }
}
