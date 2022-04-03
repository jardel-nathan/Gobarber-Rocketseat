
import User from '@modules/users/infra/typeorm/entities/User' // importa o modelo que usaremos no repositorio

import IUsersRepository from '@modules/users/repositories/IUsersRepository' // importa o interface que usaremos no repositorio

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'; // DTO: Data Transfer Object  é um objeto que representa os dados que serão enviados para o serviço
import { uuid } from 'uuidv4';

import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class FakeUsersRepository implements IUsersRepository{

  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {

    const user = this.users.find(user => user.id === id);

    return user;

  }

  public async findByEmail(email: string): Promise<User | undefined> {

    const user = this.users.find(user => user.email === email);

    return user;


  }

  public async save(user: User): Promise<User> {

    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;


  }

  public async create({email, name, password}: ICreateUserDTO): Promise<User>{

    const newUser = new User();
    newUser.id = uuid();
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;

    this.users.push(newUser);

    return newUser;

  }

  public async findAllProviders({except_user_id}:IFindAllProvidersDTO): Promise<User[]> {

      let users = this.users;

      if(except_user_id){

        users = this.users.filter(user => user.id !== except_user_id);

      }

      return users;

  }

 }

 export default FakeUsersRepository;
