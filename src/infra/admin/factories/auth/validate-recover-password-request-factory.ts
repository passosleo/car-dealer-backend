import { ValidateRecoverPasswordRequestUseCase } from '../../../../application/admin/use-cases/auth/validate-recover-password-request-use-case';
import { EncryptionServiceCryptoJS } from '../../../shared/services/encryption-service-cryptojs';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';

export class ValidateRecoverPasswordRequestUseCaseFactory {
  public static create(): ValidateRecoverPasswordRequestUseCase {
    const userRepository = new UserRepositoryPrisma();
    const encryptionService = new EncryptionServiceCryptoJS();
    return new ValidateRecoverPasswordRequestUseCase(userRepository, encryptionService);
  }
}
