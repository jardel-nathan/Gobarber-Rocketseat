import HandleExpressValidatorError from "@shared/infra/http/routes/handleValidateErrors";
import { NextFunction, Router } from "express";
import { body } from "express-validator";
import SessionsController from "../controllers/SessionsController";
const sessionsRouter = Router();
const sessionsController = new SessionsController();


sessionsRouter.post('/',
body('email').isEmail(), // email é um campo obrigatório
body('password').isString(), // senha é um campo obrigatório
HandleExpressValidatorError, // chama a função de validação de erros
sessionsController.create);

export default sessionsRouter;
