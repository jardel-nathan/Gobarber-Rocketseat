
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/errors/AppErrors";
import IMailProvider from "@shared/providers/MailProvider/models/IMailProvider";
import IUsersTokensRepository from "../repositories/IUserTokensRepository";
import path from 'path';

import { injectable, inject } from "tsyringe";

interface IRequest {
  email: string,
}

@injectable()
class SendForgotPasswordEmailService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUsersTokensRepository,
  ){}


  async execute({email}:IRequest): Promise<void> {

    //  busca o usuário pelo email
    const checkUserExist = await this.usersRepository.findByEmail(email);

    if(!checkUserExist){
      throw new AppError('User does not exist');
    }

    //  gera o token
    const {token} = await this.userTokensRepository.generate(checkUserExist.id); // gera o token  e retorna o token de recuperação de senha

    const forgotPasswordTemplateFile = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs'); //  caminho do template do email  de recuperação de senha


    await this.mailProvider.sendMail({
      to: {
        name: checkUserExist.name,
        email: checkUserExist.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplateFile, // o template que será enviado
        variables: {
          name: checkUserExist.name, //  nome do usuário
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`, // link do frontend para recuperar a senha
        },
      },

    });

  }

}


export default SendForgotPasswordEmailService;
