import HandleExpressValidatorError from "@shared/infra/http/routes/handleValidateErrors";
import { Request, Response, Router } from "express";
import { body, check, validationResult } from "express-validator";
// importo o controller que será usado no teste de alteração de senha
import ForgotPasswordController from "../controllers/ForgotPasswordController";

import ResetPasswordController from "../controllers/ResetPasswordController";

// instancio a funcao Router() que é uma função do express
const passwordRouter = Router();

// instancio o controller que será usado no teste de alteração de senha
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

// envia o email para recuperar a senha
passwordRouter.post('/forgot',
 body('email').isEmail(),
 async (request: Request, response: Response) => {

  const errors = validationResult(request); // valida se houve erros  
  if (!errors.isEmpty())
   return response.status(400).json({ errors: errors.array() }); // se houver erros retorna 400 e o erro

  forgotPasswordController.create(request, response)

 });

// altera a senha
passwordRouter.post('/reset',
 body('password').isString(),
 check('password_confirmation').isString(),
 check('token').isString(),
 HandleExpressValidatorError,
 resetPasswordController.create);

export default passwordRouter;
