import { UpdateUserUseCase } from '../../../../application/admin/users/use-cases/update-user-use-case';
import { HashServiceBcryptJS } from '../../../shared/services/hash-service-bcryptjs';
import { MailServiceNodemailer } from '../../../shared/services/mail/mail-service-nodemailer';
import { ProfileRepositoryPrisma } from '../../../profiles/repositories/profile-repository-prisma';
import { UserRepositoryPrisma } from '../data/repositories/user-repository-prisma';

export class UpdateUserUseCaseFactory {
  public static create(): UpdateUserUseCase {
    const userRepository = new UserRepositoryPrisma();
    const profileRepository = new ProfileRepositoryPrisma();
    const hashService = new HashServiceBcryptJS();
    const mailService = new MailServiceNodemailer();
    return new UpdateUserUseCase(userRepository, profileRepository, hashService, mailService);
  }
}
