/*
Middleware responsável por capturar um erro lançado (throw) e trata-la conforme o seu tipo
*/

import { NextFunction, Request, Response } from "express";
import AppError from '@shared/errors/AppErrors'

export default function AppErrorGlobal(err: Error, request: Request, response: Response, next: NextFunction) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ status: 'error', message: err.message })
  } else {
    return response.status(500).json({ status: 'error', message: 'internal server error ' })
  }
}
