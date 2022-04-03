import { response, Router } from "express";

import ensureAuthenticated from "@modules/users/infra/http/middleware/ensureAuthenticated";
import multer from 'multer'; //biblioteca de upload de arquivos
import uploadConfig from "@config/upload"; // configuração de upload de arquivos

import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";

const usersRouter = Router();

const upload = multer(uploadConfig.multer); // inicia o multer passando as configurações de upload


const userAvatarController = new UserAvatarController();

// cria um usuário
usersRouter.post('/', async (request, response) => {
  const userController = new UsersController();
  userController.create(request, response);
})



// altera o avatar de um usuário
// o multer é passado como middleware na rota e recebe como parametro o nome do arquivo a ser salvo
usersRouter.patch('/avatar',
  new ensureAuthenticated().verifyAuth,
  upload.single('avatar'),
  userAvatarController.update
)



export default usersRouter;
