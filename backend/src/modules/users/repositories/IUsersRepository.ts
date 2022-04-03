import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../infra/typeorm/entities/User";
import IFindAllProvidersDTO from "../dtos/IFindAllProvidersDTO";

// metodos que devem ser implementados
export default interface IUsersRepository{
  findById(id:string): Promise<User | undefined>;
  findByEmail(email:string): Promise<User | undefined>;
  create(data:ICreateUserDTO): Promise<User>;
  save(user:User): Promise<User>;
  findAllProviders(data:IFindAllProvidersDTO): Promise<User[]>;
}

