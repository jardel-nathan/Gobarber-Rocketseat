import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import {instanceToInstance} from 'class-transformer';

export default class SessionsController {

  public async create(request: Request, response: Response): Promise<Response> {

    const { email, password } = request.body
    
    try {
     
      // resolve é utilizado para injetar dependencias no serviço
      const authenticateUser = container.resolve(AuthenticateUserService); // instanciando o service  e injetando o container como dependencia  no service  de autenticação de usuario
      const { user, token } = await authenticateUser.execute({ email, password });
      
      return response.json({ user:instanceToInstance(user), token })

    } catch (error) {
      return response.status(400).json({error});
    }





  }


}
