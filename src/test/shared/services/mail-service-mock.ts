import { IMailService, SendMailData } from '../../../application/shared/services/mail-service';

export const MailServiceMock: jest.Mocked<IMailService> = {
  sendMail: jest.fn<Promise<void>, [SendMailData<any>]>(),
};
