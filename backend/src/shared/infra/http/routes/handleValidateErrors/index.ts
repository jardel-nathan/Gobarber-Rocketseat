import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export default function HandleExpressValidatorError(request: Request, response: Response, next: NextFunction) {
 const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }else{
   return next();
  }
 }

