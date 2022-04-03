
import { ValidationError } from "yup";

interface Errors {
  [key: string]: string;
}


export default function getValidationErrors(err: ValidationError): Errors {

 console.log(err.inner)

  const validationErrors: Errors = {};

  err.inner.forEach((erro) => {
   validationErrors[erro.path as string] = erro.message;
  }); 


  return validationErrors;

}
