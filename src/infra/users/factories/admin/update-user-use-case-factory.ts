import { HashServiceBcryptJS } from '../../../shared/services/hash-service-bcryptjs';
import { MailServiceNodemailer } from '../../../shared/services/mail/mail-service-nodemailer';
import { ProfileRepositoryPrisma } from '../../../profiles/repositories/profile-repository-prisma';
import { UpdateUserUseCase } from '../../../../application/users/use-cases/admin/update-user-use-case';
import { UserRepositoryPrisma } from '../../repositories/user-repository-prisma';

export class UpdateUserUseCaseFactory {
  public static create(): UpdateUserUseCase {
    const userRepository = new UserRepositoryPrisma();
    const profileRepository = new ProfileRepositoryPrisma();
    const hashService = new HashServiceBcryptJS();
    const mailService = new MailServiceNodemailer();
    return new UpdateUserUseCase(userRepository, profileRepository, hashService, mailService);
  }
}
