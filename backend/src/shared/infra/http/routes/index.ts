import { Router } from 'express';

// importando rotas que estão em outros arquivos
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes' // rota de agendamentos
import usersRouter from '@modules/users/infra/http/routes/users.routes' //  users.routes.ts
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes' // rota de login

import passwordRouter from '@modules/users/infra/http/routes/passwords.routes' // rota de alteração de senha
import profileUserRouter from '@modules/users/infra/http/routes/profile.routes';
import providerRouter from '@modules/appointments/infra/http/routes/providers.routes';

const routes = Router();

routes.get('/', (request, response) => { // rota raiz
  return response.json('ROTA PRINCIPAL');
})


// utilizando rotas de outros arquivos
routes.use('/appointments', appointmentsRouter); // utilizando as rotas de appointments
routes.use('/users', usersRouter); // utilizando as rotas de users
routes.use('/sessions', sessionsRouter); // utilizando as rotas de sessions
routes.use('/password', passwordRouter); // utilizando as rotas de password
routes.use('/profile', profileUserRouter); // utilizando as rotas de profile
routes.use('/provider', providerRouter); // utilizando as rotas de provider



export default routes;
