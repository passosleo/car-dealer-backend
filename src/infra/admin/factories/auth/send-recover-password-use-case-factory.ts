import { SendRecoverPasswordUseCase } from '../../../../application/admin/use-cases/auth/send-password-recover-use-case';
import { UserPasswordRecoverAttemptRepositoryPrisma } from '../../data/repositories/user-password-recover-attempt-repository-prisma';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';

export class SendRecoverPasswordUseCaseFactory {
  public static create(): SendRecoverPasswordUseCase {
    const userRepository = new UserRepositoryPrisma();
    const userPasswordRecoverAttemptRepository = new UserPasswordRecoverAttemptRepositoryPrisma();
    return new SendRecoverPasswordUseCase(userRepository, userPasswordRecoverAttemptRepository);
  }
}
