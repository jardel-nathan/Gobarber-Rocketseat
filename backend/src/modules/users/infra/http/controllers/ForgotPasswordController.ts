import {Request, Response} from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {

  public async create(request: Request, response: Response): Promise<Response> {

    const { email } = request.body

    // resolve é utilizado para injetar dependencias no serviço
    const sendForgotPasswordEmailService = container.resolve(SendForgotPasswordEmailService); // instanciando o service  e injetando o container como dependencia  no service  de autenticação de usuario

    await sendForgotPasswordEmailService.execute({ email });

    // status 204 significa que não tem conteudo para retornar mas sim que a requisição foi bem sucedida
    return response.status(204).json();



  }


}
