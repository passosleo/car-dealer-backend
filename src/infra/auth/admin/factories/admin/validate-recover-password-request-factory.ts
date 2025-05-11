import { ValidateRecoverPasswordRequestUseCase } from '../../../../../application/auth/use-cases/admin/validate-recover-password-request-use-case';
import { EncryptionServiceCryptoJS } from '../../../../shared/services/encryption-service-cryptojs';
import { UserPasswordRecoverAttemptRepositoryPrisma } from '../../../../users/repositories/user-password-recover-attempt-repository-prisma';
import { UserRepositoryPrisma } from '../../../../users/repositories/user-repository-prisma';

export class ValidateRecoverPasswordRequestUseCaseFactory {
  public static create(): ValidateRecoverPasswordRequestUseCase {
    const userRepository = new UserRepositoryPrisma();
    const userPasswordRecoverAttemptRepository = new UserPasswordRecoverAttemptRepositoryPrisma();
    const encryptionService = new EncryptionServiceCryptoJS();
    return new ValidateRecoverPasswordRequestUseCase(
      userRepository,
      userPasswordRecoverAttemptRepository,
      encryptionService,
    );
  }
}
