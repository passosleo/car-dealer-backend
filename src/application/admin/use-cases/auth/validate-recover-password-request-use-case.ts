import { IUserRepository } from '../../../../domain/admin/repositories/user-repository';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { IEncryptionService } from '../../../shared/services/encryption-service';

export class ValidateRecoverPasswordRequestUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly encryptionService: IEncryptionService,
  ) {}

  public async execute(token: string): Promise<void> {
    const { userId, expiresAt } = this.encryptionService.decrypt<{
      userId: string;
      expiresAt: Date;
    }>(token);
    if (expiresAt < new Date()) throw new HttpException(HttpStatus.UNAUTHORIZED, 'Token expired');
    const user = await this.userRepository.findById(userId);
    if (!user) throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
  }
}
