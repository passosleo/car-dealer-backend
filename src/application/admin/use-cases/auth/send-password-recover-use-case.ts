import { IUserRepository } from '../../../../domain/admin/repositories/user-repository';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { IUserPasswordRecoverAttemptRepository } from '../../../../domain/admin/repositories/user-password-recover-attempt-repository';
import { SendRecoverPasswordRequestDTO } from '../../../../infra/admin/http/dtos/auth/send-recover-password-request-dto';
import { UserPasswordRecoverAttempt } from '../../../../domain/admin/entities/user-password-recover-attempt-entity';

export class SendRecoverPasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userPasswordRecoverAttemptRepository: IUserPasswordRecoverAttemptRepository,
  ) {}

  private readonly MAX_ATTEMPTS = 5;
  private readonly TIME_LIMIT_SECONDS = 45;
  private readonly TIME_BLOCKED_MINUTES = 10;

  public async execute(data: SendRecoverPasswordRequestDTO): Promise<void> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
    }

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
      const remainingBanTime = this.calculateRemainingBanTime(userPasswordRecoverAttempt.blockedUntil);
      const remainingBanTimeInMinutes = Math.floor(remainingBanTime / 60);
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

    const secondsSinceLastAttempt = this.secondsDifference(new Date(), userPasswordRecoverAttempt.lastAttemptAt);
    if (secondsSinceLastAttempt < this.TIME_LIMIT_SECONDS) {
      const remainingSeconds = Math.floor(this.TIME_LIMIT_SECONDS - secondsSinceLastAttempt);
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
      const remainingBanTime = Math.floor((blockedUntil.getTime() - new Date().getTime()) / 60000);
      throw new HttpException(
        HttpStatus.FORBIDDEN,
        `Too many attempts. Your account has been temporarily blocked. Please try again in ${remainingBanTime} minutes.`,
      );
    }

    await this.userPasswordRecoverAttemptRepository.update(userPasswordRecoverAttempt.attemptId, {
      attemptCount: updatedAttemptCount,
      lastAttemptAt: new Date(),
      blockedUntil: null,
    });

    return this.sendRecoveryEmail(user);
  }

  private secondsDifference(date1: Date, date2: Date): number {
    const diffInMillis = date1.getTime() - date2.getTime();
    return diffInMillis / 1000;
  }

  private calculateRemainingBanTime(blockedUntil: Date): number {
    const remainingTime = blockedUntil.getTime() - new Date().getTime();
    return Math.max(Math.floor(remainingTime / 1000), 0);
  }

  private async sendRecoveryEmail(user: any) {
    console.log(`Sending recovery email to ${user.email}`);
  }
}
