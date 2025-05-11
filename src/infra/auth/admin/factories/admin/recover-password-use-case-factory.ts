import { RecoverPasswordUseCase } from '../../../../../application/auth/use-cases/admin/recover-password-use-case';
import { EncryptionServiceCryptoJS } from '../../../../shared/services/encryption-service-cryptojs';
import { HashServiceBcryptJS } from '../../../../shared/services/hash-service-bcryptjs';
import { UserPasswordRecoverAttemptRepositoryPrisma } from '../../../../users/repositories/user-password-recover-attempt-repository-prisma';
import { UserRepositoryPrisma } from '../../../../users/repositories/user-repository-prisma';

export class RecoverPasswordUseCaseFactory {
  public static create(): RecoverPasswordUseCase {
    const userRepository = new UserRepositoryPrisma();
    const userPasswordRecoverAttemptRepository = new UserPasswordRecoverAttemptRepositoryPrisma();
    const encryptionService = new EncryptionServiceCryptoJS();
    const hashService = new HashServiceBcryptJS();
    return new RecoverPasswordUseCase(
      userRepository,
      userPasswordRecoverAttemptRepository,
      encryptionService,
      hashService,
    );
  }
}
