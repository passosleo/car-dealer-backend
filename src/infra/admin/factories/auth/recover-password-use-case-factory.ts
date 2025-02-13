import { RecoverPasswordUseCase } from '../../../../application/admin/use-cases/auth/recover-password-use-case';
import { EncryptionServiceCryptoJS } from '../../../shared/services/encryption-service-cryptojs';
import { HashServiceBcrypt } from '../../../shared/services/hash-service-bcrypt';
import { UserPasswordRecoverAttemptRepositoryPrisma } from '../../data/repositories/user-password-recover-attempt-repository-prisma';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';

export class RecoverPasswordUseCaseFactory {
  public static create(): RecoverPasswordUseCase {
    const userRepository = new UserRepositoryPrisma();
    const userPasswordRecoverAttemptRepository = new UserPasswordRecoverAttemptRepositoryPrisma();
    const encryptionService = new EncryptionServiceCryptoJS();
    const hashService = new HashServiceBcrypt();
    return new RecoverPasswordUseCase(
      userRepository,
      userPasswordRecoverAttemptRepository,
      encryptionService,
      hashService,
    );
  }
}
