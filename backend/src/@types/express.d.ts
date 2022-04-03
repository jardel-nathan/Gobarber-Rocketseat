/*
Subescrevendo tipagems
https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html
*/

declare namespace Express{
  export interface Request{
    user: {
      id:string;
    }
  }
}
