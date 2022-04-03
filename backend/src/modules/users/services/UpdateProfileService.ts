import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "../../../shared/errors/AppErrors";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import { inject, injectable } from "tsyringe";

interface Request {
  user_id: string,
  name: string
  email: string
  old_password?: string
  password?: string
}

@injectable()
export default class UpdateProfileService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ user_id, name, email, old_password, password }: Request): Promise<User> {


    // confere se o usuário á existe
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found',)
    }

    // confere se o email não esta em uso
    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);


    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id){
      throw new AppError('Email already exists');
    }

    // confere se as senhas são iguais
    if(password && !old_password){
      throw new AppError('you need to inform the old password to set a new password');
    }

    if(password && old_password){
      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password)

      if(!checkOldPassword){
        throw new AppError('Old password not match.')
      }

      user.password = await this.hashProvider.generateHash(password)

    }

    user.name = name;
    user.email = email;

    return await this.usersRepository.save(user);



  }

}
