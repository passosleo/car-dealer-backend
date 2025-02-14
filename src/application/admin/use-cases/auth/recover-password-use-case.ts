import { IUserRepository } from '../../../../domain/admin/repositories/user-repository';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { IHashService } from '../../../shared/services/hash-service';
import { IUserPasswordRecoverAttemptRepository } from '../../../../domain/admin/repositories/user-password-recover-attempt-repository';
import { RecoverPasswordRequestDTO } from '../../../../infra/admin/http/dtos/auth/recover-password-request-dto';
import { IEncryptionService } from '../../../shared/services/encryption-service';

export class RecoverPasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userPasswordRecoverAttemptRepository: IUserPasswordRecoverAttemptRepository,
    private readonly encryptionService: IEncryptionService,
    private readonly hashService: IHashService,
  ) {}

  public async execute(data: RecoverPasswordRequestDTO): Promise<void> {
    const { userId, expiresAt } = this.encryptionService.decrypt<{
      userId: string;
      expiresAt: Date;
    }>(data.token);

    if (expiresAt < new Date()) throw new HttpException(HttpStatus.UNAUTHORIZED, 'Token expired');

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
    }

    const userPasswordRecoverAttempt = await this.userPasswordRecoverAttemptRepository.findByUserId(userId);
    if (userPasswordRecoverAttempt && data.token === userPasswordRecoverAttempt.token) {
      const passwordHashed = await this.hashService.hash(data.newPassword);
      await Promise.all([
        this.userPasswordRecoverAttemptRepository.delete(userPasswordRecoverAttempt.attemptId),
        this.userRepository.update(userId, { password: passwordHashed, passwordChangedAt: new Date() }),
      ]);
    } else {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid token');
    }
  }
}
