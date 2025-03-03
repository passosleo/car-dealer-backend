import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { IEncryptionService } from '../../../shared/services/encryption-service';
import { IUserRepository } from '../../../../domain/admin/users/repositories/user-repository';
import { IUserPasswordRecoverAttemptRepository } from '../../../../domain/admin/users/repositories/user-password-recover-attempt-repository';

export class ValidateRecoverPasswordRequestUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userPasswordRecoverAttemptRepository: IUserPasswordRecoverAttemptRepository,
    private readonly encryptionService: IEncryptionService,
  ) {}

  public async execute(token: string): Promise<void> {
    const { userId, expiresAt } = this.encryptionService.decrypt<{
      userId: string;
      expiresAt: Date;
    }>(token);

    if (expiresAt < new Date()) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Token expired');
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
    }

    const userPasswordRecoverAttempt = await this.userPasswordRecoverAttemptRepository.findByUserId(userId);
    if (!userPasswordRecoverAttempt || token !== userPasswordRecoverAttempt.token) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid token');
    }
  }
}
