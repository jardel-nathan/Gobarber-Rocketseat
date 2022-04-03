
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/errors/AppErrors";
import IUsersTokensRepository from "../repositories/IUserTokensRepository";
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import {differenceInHours} from 'date-fns';
import { injectable, inject } from "tsyringe";

interface IRequest {
  token: string,
  password: string,
  password_confirmation: string
}

@injectable()
class ResetPasswordService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUsersTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}


  async execute({ token, password, password_confirmation }: IRequest): Promise<void> {

    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = differenceInHours(Date.now(), tokenCreatedAt);
    if (compareDate > 2) {
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);
    await this.usersRepository.save(user);


  }

}


export default ResetPasswordService;
