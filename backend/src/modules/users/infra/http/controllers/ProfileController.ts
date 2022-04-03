import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';


export default class ProfileController {


  public async show(request: Request, response: Response): Promise<Response> {

    const user_id = request.user.id;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({ user_id });

    return response.json(user);;

  }



  public async update(request: Request, response: Response): Promise<Response> {
    try {

      const { name, email, password, old_password } = request.body;

      const user_id = request.user.id; // id do usuário logado

      const updateProfile = container.resolve(UpdateProfileService);

      const user = await updateProfile.execute({
        user_id,
        name,
        email,
        password,
        old_password
      });

      return response.json(instanceToInstance(user));

    } catch (err: any) {
      return response.status(400).json({ error: err.message })
    }
  }


}
