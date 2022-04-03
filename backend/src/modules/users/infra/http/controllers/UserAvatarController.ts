import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';


export default class UserAvatarController {

  public async update(request: Request, response: Response): Promise<Response> {

    const updatedUserAvatar = container.resolve(UpdateUserAvatarService);
    

   const user =  await updatedUserAvatar.execute({ user_id: request.user.id, avatar_filename: request.file!.filename })
    return response.json(instanceToInstance(user))

  }


}

