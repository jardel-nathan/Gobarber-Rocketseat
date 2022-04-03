import 'reflect-metadata';
import { format, getHours, startOfHour } from "date-fns";
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment"; // entidade do appointment
import IAppointmentsRepository from "../repositories/IAppointmentsRepository"; // metodos do repositorio
import { inject, injectable } from 'tsyringe'; // importa o decorator injectable
import { isBefore } from 'date-fns';
import AppError from '@shared/errors/AppErrors';
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

interface IRequest { // interface que define os dados que serão recebidos
  date: Date,
  provider_id: string,
  user_id: string
}

@injectable() // indica que a classe é um serviço injetável - o decorator injectable é utilizado para injetar dependencias
class CreateAppointmentService {

  constructor(
    @inject('AppointmentsRepository') //  injeta o repositório de agendamentos  no construtor da classe CreateAppointmentService
    private appointmentsRepository: IAppointmentsRepository, //private define que o atributo appointmentsRepository é privado  e não pode ser acessado fora da classe

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider


  ) { }



  public async execute({ date, provider_id, user_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date); // transforma a data em hora com o metodo startOfHour

    
    if (isBefore(appointmentDate, Date.now())) { // verifica se a data do agendamento é antes de agora
      throw new AppError('Past dates are not permitted'); // se for antes de agora, lança um erro
    }
    
    if(provider_id === user_id){
      throw new AppError('You cannot create an appointment with yourself');
    }

    if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17){
      throw new AppError('You can only create appointments between 8am and 5pm');
    }
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate, provider_id) //  busca um agendamento com a mesma data
 
    if (findAppointmentInSameDate) { // se encontrar um agendamento
      throw new AppError('This appointment is alread booked'); // lança um erro de agendamento já existente
    }
    
    const appointment = await this.appointmentsRepository.create({ // cria um agendamento com os dados passados
      user_id,
      provider_id,
      date: appointmentDate
    })

    const dateformatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'"); 

    await this.notificationsRepository.create({ // cria uma notificação
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateformatted}`
    })

  

   await this.cacheProvider.invalidate(`provider-appointments:${provider_id}:${format(appointmentDate, 'yyyy-MM-dd')}`); // limpa o cache

    return appointment; // retorna o agendamento

  }


}


export default CreateAppointmentService;
