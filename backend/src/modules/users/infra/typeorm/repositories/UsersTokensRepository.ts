/*
Repositórios:
os repositórios são classes que contem funções especificas para trabalhar com uma tabela do banco de dados.
*/

import { getRepository, Repository } from 'typeorm' // importa o getRepository e Repository

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'; // importa o interface que usaremos no repositorio

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'; // DTO: Data Transfer Object  é um objeto que representa os dados que serão enviados para o serviço

import UserToken from '../entities/UserToken'; // importa o modelo que usaremos no repositorio

import { uuid } from 'uuidv4'; // importa o uuid

class UsersTokensRepository implements IUserTokensRepository {
  // estaremos extendendo o Repository para que possamos utilizar nesta classe os metodos padrão do Repository
  // implementa o IUsersRepository interface com os metodos padrão do Repository

  private ormRepository: Repository<UserToken>;

  constructor(){ // construtor da classe
    this.ormRepository = getRepository(UserToken, 'pg')
  }


  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    })
    await this.ormRepository.save(userToken)
    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const   userToken = await this.ormRepository.findOne({where: {token}})
    return userToken;
  }


  }

 export default UsersTokensRepository;
