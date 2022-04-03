import {Request, Response} from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {

  public async create(request: Request, response: Response): Promise<Response> {

   
    try {
      const { token, password, password_confirmation } = request.body

      // resolve é utilizado para injetar dependencias no serviço
      const resetPasswordService = container.resolve(ResetPasswordService); // instanciando o service  e injetando o container como dependencia  no service  de autenticação de usuario
  
      await resetPasswordService.execute({ token, password, password_confirmation })
  
      // status 204 significa que não tem conteudo para retornar mas sim que a requisição foi bem sucedida
      return response.status(204).json();

    } catch (err: any) {
      return response.status(400).json({ error: err.message })
    }

  }


}
