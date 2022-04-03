/*
Repositórios:
os repositórios são classes que contem funções especificas para trabalhar com uma tabela.
*/

import { getRepository, Not, Repository } from 'typeorm' // importa o getRepository e Repository

import User from '@modules/users/infra/typeorm/entities/User' // importa o modelo que usaremos no repositorio

import IUsersRepository from '@modules/users/repositories/IUsersRepository' // importa o interface que usaremos no repositorio

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'; // DTO: Data Transfer Object  é um objeto que representa os dados que serão enviados para o serviço
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';


class UsersRepository implements IUsersRepository {
  // estaremos extendendo o Repository para que possamos utilizar nesta classe os metodos padrão do Repository
  // implementa o IUsersRepository interface com os metodos padrão do Repository

  private ormRepository: Repository<User>; // ormRepository é um repositório que é um objeto do tipo Repository
  constructor() { // construtor da classe
    this.ormRepository = getRepository(User, 'pg')
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } })
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }

  public async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepository.create({ email, name, password })
    await this.ormRepository.save(appointment)
    return appointment;
  }

  public async findAllProviders({except_user_id}:IFindAllProvidersDTO): Promise<User[]> {

    if (except_user_id) {
      return this.ormRepository.find({
        where: {
          id: Not(except_user_id)
        }
      })
    }

    return this.ormRepository.find()

  }

}

export default UsersRepository;
