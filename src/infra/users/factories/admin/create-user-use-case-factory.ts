import { HashServiceBcryptJS } from '../../../shared/services/hash-service-bcryptjs';
import { MailServiceNodemailer } from '../../../shared/services/mail/mail-service-nodemailer';
import { ProfileRepositoryPrisma } from '../../../profiles/repositories/profile-repository-prisma';
import { UserRepositoryPrisma } from '../../repositories/user-repository-prisma';
import { CreateUserUseCase } from '../../../../application/users/use-cases/admin/create-user-use-case';

export class CreateUserUseCaseFactory {
  public static create(): CreateUserUseCase {
    const userRepository = new UserRepositoryPrisma();
    const profileRepository = new ProfileRepositoryPrisma();
    const hashService = new HashServiceBcryptJS();
    const mailService = new MailServiceNodemailer();
    return new CreateUserUseCase(userRepository, profileRepository, hashService, mailService);
  }
}
