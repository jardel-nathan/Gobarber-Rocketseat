import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppErrors";


import { Secret, sign } from "jsonwebtoken";// sign: função utilizada para gerar o token JWT

import IUsersRepository from "@modules/users/repositories/IUsersRepository"; // metodos do repositório de usuários


import {inject, injectable} from 'tsyringe'; // injecao de dependencia

import IHashProvider from '../providers/HashProvider/models/IHashProvider'; // interface de hash


interface Request {// interface para o request
  email: string,
  password: string,
}

@injectable() //injectable é utilizado para injetar dependencias no serviço
class AuthenticateUserService {

  constructor (
  @inject('UsersRepository') // injeta o UsersRepository como dependencia no serviço
  private usersRepository: IUsersRepository,

  @inject('HashProvider') // injeta o HashProvider como dependencia no serviço
  private hashProvider: IHashProvider,
  )
  {}

  public async execute({ email, password }: Request): Promise<{ user: User, token: string }> {

   


    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("Incorrect Email/password combination", 401)
    }

    //user.password = senha criptograda

    //password = senha não criptografada

    const passwordMatch = await this.hashProvider.compareHash(password, user.password); // compara as senhas

    if (!passwordMatch) {
      throw new AppError("Incorrect Email/password combination", 401)
    }

    const secretJWT = process.env.SECRET as Secret; // pega a chave SECRET do arquivo .env
    /*
    Sign JWT
    O metodo sign recebe os seguintes parâmetros: jwt.sign(payload, secretOrPrivateKey, [options, callback])
    payload: Objeto com informações que dejesarmos salvar junto como o token
    secretOrPrivateKey: Chave privada para encriptação
    options: opções de configurações to token
    callback: função de callback
    */
    const token = sign({ name: user.name }, secretJWT, { // gera token JWT
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token }; // retorna usuário e o token JWT

  }


}


export default AuthenticateUserService;
