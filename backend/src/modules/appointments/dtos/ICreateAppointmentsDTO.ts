// DTO:   ICreateAppointmentsDTO  - DTO para criar um agendamento de um serviço de um usuário específico
// DTOs são utilizados para validar os dados de entrada de um controller
export default interface ICreateAppointmentsDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}
