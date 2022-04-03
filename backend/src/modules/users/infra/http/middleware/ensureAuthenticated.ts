/*
Middleware é todo o tipo de função que está entre um pedido HTTP e a resposta final que o servidor envia de volta para o cliente.
*/

import { Request, Response, NextFunction } from "express";
import { Secret, verify } from "jsonwebtoken"; // importando o verify do jwt para checar a validade do token
const dotenv = require('dotenv').config() // biblioteca para utiliar o .env
import AppError from "@shared/errors/AppErrors"; // importando o AppError
 // configuração do .env


interface TokenPayload { // interface para o payload do token
  iat: number,
  exp: number,
  sub: string
}

class ensureAuthenticated {

  //valida token jwt
  public verifyAuth(request: Request, response: Response, next: NextFunction): void {
    
    const authHeader = request.headers.authorization;//pega o token header da requisicao
   
    
    if (!authHeader) {
      throw new Error('JWT token not exist')
    }

    //Exemplo de token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

    const [, token] = authHeader.split(' '); // separa o Bearer da chave token

    try {
      const secretJWT = process.env.SECRET as Secret;
      const decoded = verify(token, secretJWT); // verifica validade do token

      const { sub } = decoded as TokenPayload; // forca a variavel a ter um tipo diferente do seu padrão

      request.user = { id: sub }; // passa o sub para a request, desta forma é possivel acesar a varivel user de qualquer rota que usa este middleware

      return next();

    } catch (error) {
      throw new AppError('invalid token');
    }


  }

}

export default ensureAuthenticated;
