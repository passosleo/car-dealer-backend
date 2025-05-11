import { SendRecoverPasswordUseCase } from '../../../../../application/auth/use-cases/admin/send-recover-password-use-case';
import { EncryptionServiceCryptoJS } from '../../../../shared/services/encryption-service-cryptojs';
import { MailServiceNodemailer } from '../../../../shared/services/mail/mail-service-nodemailer';
import { UserPasswordRecoverAttemptRepositoryPrisma } from '../../../../users/repositories/user-password-recover-attempt-repository-prisma';
import { UserRepositoryPrisma } from '../../../../users/repositories/user-repository-prisma';

export class SendRecoverPasswordUseCaseFactory {
  public static create(): SendRecoverPasswordUseCase {
    const userRepository = new UserRepositoryPrisma();
    const userPasswordRecoverAttemptRepository = new UserPasswordRecoverAttemptRepositoryPrisma();
    const mailService = new MailServiceNodemailer();
    const encryptionService = new EncryptionServiceCryptoJS();
    return new SendRecoverPasswordUseCase(
      userRepository,
      userPasswordRecoverAttemptRepository,
      mailService,
      encryptionService,
    );
  }
}
