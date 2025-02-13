import { IMailService, MailTemplate, SendMailData } from '../../../application/shared/services/mail-service';

export class MailServiceNodemailer implements IMailService {
  sendMail<T extends MailTemplate>(data: SendMailData<T>): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
