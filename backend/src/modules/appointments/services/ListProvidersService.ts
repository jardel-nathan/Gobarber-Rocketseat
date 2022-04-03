import User from "@modules/users/infra/typeorm/entities/User";
import { inject, injectable } from "tsyringe";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICacheProvider from "@shared/providers/CacheProvider/models/ICacheProvider";
import { instanceToInstance } from "class-transformer";

interface Request {
  user_id: string,
}

@injectable()
export default class ListProviderService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ user_id }: Request): Promise<User[]> {

    let users = await this.cacheProvider.recover<User[]>(`providers-list:${user_id}`); // caso exista a chave no cache, retorna o valor

    if (!users) {
      // confere se o usuário á existe
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });
      await this.cacheProvider.save(`providers-list:${user_id}`, instanceToInstance(users)); // salva o valor no cache
    }

    
    return instanceToInstance(users);



  }

}
