import IMailProvider from "../models/IMailProvider";
import nodemailer, { Transport, Transporter } from 'nodemailer';
import ISendMailDTO from "../dtos/ISendMailDTO";
import aws from 'aws-sdk';
import IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider";
import { inject, injectable } from "tsyringe";


@injectable()
export default class SESMailProvider implements IMailProvider {

 private client: Transporter;

 constructor(
  @inject('MailTemplateProvider')
  private mailTemplateProvider: IMailTemplateProvider
 ) {

  this.client = nodemailer.createTransport({
   SES: new aws.SES({
    apiVersion: "2010-12-01",
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
   }),

  })


 }

 public async sendMail({ subject, templateData, to, from }: ISendMailDTO): Promise<void> {

 

  let info = await this.client.sendMail({
   from: {
    name: from?.name || 'Equipe GoBarber',
    address: from?.email || 'contato@mypetbr.com.br'
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
