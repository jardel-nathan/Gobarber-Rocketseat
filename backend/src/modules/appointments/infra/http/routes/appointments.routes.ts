import { NextFunction, Request, Response, Router } from "express";
import ensureAuthenticated from "@modules/users/infra/http/middleware/ensureAuthenticated"; //importando middleware de autenticação

import AppointmentController from "../controllers/AppointmentController"; // importando o controller
import ProviderAppointmentsController from "../controllers/ProviderAppointmentsController";

import { body, validationResult } from 'express-validator';
import HandleExpressValidatorError from "@shared/infra/http/routes/handleValidateErrors";

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(new ensureAuthenticated().verifyAuth)// utilizando o middleware em todos as rotas deste arquivo


appointmentsRouter.post('/', [
 body('provider_id').isString(), // verifica se o provider_id é uma string
 body('date').isISO8601(), // verifica se a data é uma data válida
 HandleExpressValidatorError // middleware de erro
],
appointmentController.create
)


appointmentsRouter.get('/me', providerAppointmentsController.index)




export default appointmentsRouter;
