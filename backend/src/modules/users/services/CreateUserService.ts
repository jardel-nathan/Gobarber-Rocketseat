import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import AppError from "@shared/errors/AppErrors";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

import { injectable, inject } from "tsyringe";
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

interface Request{
  name:string,
  email:string,
  password:string,
}

@injectable()
class CreateUserService{

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
    ){}


async execute({name, email, password}:Request): Promise<User>{

  const checkIsUserExist = await this.usersRepository.findByEmail(email)

  if(checkIsUserExist){
    throw new AppError('E-mail address alread existe in database')
  }


  const hashedPassword = await this.hashProvider.generateHash(password);

  const user = await this.usersRepository.create({
    name,
    email,
    password: hashedPassword
  });
 
  await this.cacheProvider.invalidatePrefix('providers-list');
 
  return user;

}

}


export default CreateUserService;
