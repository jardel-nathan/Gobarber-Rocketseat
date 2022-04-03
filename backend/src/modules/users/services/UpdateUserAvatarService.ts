
import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "../../../shared/errors/AppErrors";
import IUsersRepository from "../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
interface Request {
  user_id: string,
  avatar_filename: string
}
import IStorageProvider from "@shared/providers/StorageProvider/models/IStorageProvider";

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }

  public async execute({ user_id, avatar_filename }: Request): Promise<User> {


    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found',)
    }


    if (user.avatar) {
      //deletar avatar anterior
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatar_filename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    const delay = (ms:any) => new Promise(resolve => setTimeout(resolve, ms)) 
    await delay(500) // cria esse delay para que a imagem possa estar disponível antes de ser retornada
    
    return user;

  }

}
