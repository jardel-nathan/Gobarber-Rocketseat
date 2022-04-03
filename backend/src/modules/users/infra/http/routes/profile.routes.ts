import { response, Router } from "express";

import ensureAuthenticated from "@modules/users/infra/http/middleware/ensureAuthenticated";


import ProfileController from "../controllers/ProfileController";

const profileUserRouter = Router();

const profileController = new ProfileController();


profileUserRouter.use(new ensureAuthenticated().verifyAuth)// todas as rotas desse arquivo deverão ser autenticadas, por isso passamos o ensurenceAuthenticaded dentro do método use() da rota

profileUserRouter.put('/update', async (request, response) => { profileController.update(request, response) })
profileUserRouter.get('/show', async (request, response) => { profileController.show(request, response) })



export default profileUserRouter;
