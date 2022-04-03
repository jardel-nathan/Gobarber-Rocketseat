import { Request, Response, Router } from "express";
import ensureAuthenticated from "@modules/users/infra/http/middleware/ensureAuthenticated"; //importando middleware de autenticação

import ProvidersController from "../controllers/ProvidersController"; // importando o controller
import ProviderMonthAvailabilityController from "../controllers/ProviderMonthAvailabilityController";
import ProviderDayAvailabilityController from "../controllers/ProviderDayAvailabilityController";
import { param, validationResult } from "express-validator";
import HandleValidateErrors from "@shared/infra/http/routes/handleValidateErrors";

const providerRouter = Router();
const providerController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providerRouter.use(new ensureAuthenticated().verifyAuth)// utilizando o middleware em todos as rotas deste arquivo


providerRouter.get('/', async (request, response) => {
  providerController.index(request, response)
})


providerRouter.get('/:provider_id/month-availability',
  param('provider_id').isUUID(), // validação do parametro provider_id   
  HandleValidateErrors,
  providerMonthAvailabilityController.index
)

providerRouter.get('/:provider_id/day-availability', async (request, response) => {
 
  await providerDayAvailabilityController.index(request, response)
})






export default providerRouter;
