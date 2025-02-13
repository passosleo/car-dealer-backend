import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import {
  IMailService,
  MailTemplate,
  MailTemplateData,
  SendMailData,
} from '../../../../application/shared/services/mail-service';

export class MailServiceNodemailer implements IMailService {
  // private readonly transporter: Transporter;

  // constructor() {
  //   this.transporter = nodemailer.createTransport({
  //     host: CONFIG.mail.host,
  //     port: CONFIG.mail.port,
  //     auth: {
  //       user: CONFIG.mail.user,
  //       pass: CONFIG.mail.password,
  //     },
  //     from: CONFIG.mail.user,
  //   });
  // }

  private async initializeTransporter() {
    const account = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
  }

  public async sendMail<T extends MailTemplate>({ to, subject, data, template, body }: SendMailData<T>): Promise<void> {
    const transporter = await this.initializeTransporter();

    const message = await transporter.sendMail({
      to,
      subject,
      text: body,
      html: this.renderTemplate(template, data),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }

  private renderTemplate<T extends MailTemplate>(template: T, data: MailTemplateData[T]): string {
    const filePath = path.join(__dirname, `./templates/${template}.html`);
    let content = fs.readFileSync(filePath, 'utf8');

    content = content.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
      const value = data[key as keyof MailTemplateData[T]];
      return value !== undefined ? String(value) : '';
    });

    return content;
  }
}
