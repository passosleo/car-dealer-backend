export interface SendMailData<T extends MailTemplate> {
  to: string;
  subject: string;
  template: T;
  data: MailTemplateData[T];
  body?: string;
}

export type MailTemplate = 'welcome' | 'recover-password';

export type MailTemplateData = {
  welcome: { firstName: string; email: string; password: string };
  'recover-password': { firstName: string; resetLink: string };
};

export interface IMailService {
  sendMail<T extends MailTemplate>(data: SendMailData<T>): Promise<void>;
}
