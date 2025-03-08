import { CreateUserUseCase } from '../../../../application/admin/users/use-cases/create-user-use-case';
import { HashServiceBcrypt } from '../../../shared/services/hash-service-bcrypt';
import { MailServiceNodemailer } from '../../../shared/services/mail/mail-service-nodemailer';
import { ProfileRepositoryPrisma } from '../../profiles/data/repositories/profile-repository-prisma';
import { UserRepositoryPrisma } from '../data/repositories/user-repository-prisma';

export class CreateUserUseCaseFactory {
  public static create(): CreateUserUseCase {
    const userRepository = new UserRepositoryPrisma();
    const profileRepository = new ProfileRepositoryPrisma();
    const hashService = new HashServiceBcrypt();
    const mailService = new MailServiceNodemailer();
    return new CreateUserUseCase(userRepository, profileRepository, hashService, mailService);
  }
}
