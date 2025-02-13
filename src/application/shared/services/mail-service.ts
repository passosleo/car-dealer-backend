export interface SendMailData<T extends MailTemplate> {
  to: string;
  subject: string;
  body?: string;
  template: T;
  data: MailTemplateData[T];
}

export type MailTemplate = 'welcome' | 'recover-password';

export type MailTemplateData = {
  welcome: { email: string };
  'recover-password': { fullName: string; resetLink: string };
};

export interface IMailService {
  sendMail<T extends MailTemplate>(data: SendMailData<T>): Promise<void>;
}
