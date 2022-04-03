import ListProvidersService from '@modules/appointments/services/ListProvidersService';


import { Request, Response } from 'express';
import { container } from 'tsyringe';



export default class ProviderController {

  public async index(request: Request, response: Response): Promise<Response> {


    const user_id = request.user.id;

    const listProvidersService = container.resolve(ListProvidersService); // instanciando o service

    const providers = await listProvidersService.execute({
      user_id: user_id
     });

    return response.json(providers);

  }

}

