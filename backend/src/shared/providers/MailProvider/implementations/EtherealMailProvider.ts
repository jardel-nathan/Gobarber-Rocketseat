import IMailProvider from "../models/IMailProvider";
import nodemailer, { Transport } from 'nodemailer';
import ISendMailDTO from "../dtos/ISendMailDTO";

import  IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider";
import { inject, injectable } from "tsyringe";



@injectable()
export default class EtherealMailProvider implements IMailProvider {

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
    ) { }

  public async sendMail({subject, templateData, to, from}:ISendMailDTO): Promise<void> {

    let account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    })

    let info = await transporter.sendMail({
      from:{
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'test@mail.com'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    })

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  }

}
