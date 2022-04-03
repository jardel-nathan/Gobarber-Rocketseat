import "reflect-metadata"; // reflect-metadata shim for TypeScript
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import routes from "./routes";
import AppErrorGlobal from "./middleware/AppErrorGlobal"; // middleware de error
import cors from "cors";
import 'dotenv/config';
import rateLimiter from "./middleware/RateLimiter";

import '@shared/infra/typeorm';
import '@shared/container';
import '@shared/providers';
const app = express();


// cors é um middleware que permite que a aplicação acesse a API de outros domínios
app.use(cors());
// para que o express entenda json
app.use(express.json())
// routes  -  todas as rotas que estão em routes

app.get('/files/:file', (request, response) => {
  const { file } = request.params;
  return response.sendFile('/uploads/' + file);
})

app.use(rateLimiter)
app.use(routes);

// middleware global para receber e tratar os erros
app.use(AppErrorGlobal)

//  roda a aplicação  -  3333 porta que a aplicação vai rodar
app.listen(3333, () => {
  console.log("'Server is running on http://localhost:3333 🌏")
})
