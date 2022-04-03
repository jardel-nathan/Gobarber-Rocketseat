// dtos são utilizados para validar os dados de entrada de um controller
export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

