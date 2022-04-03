/*
Repositórios:
os repositórios são classes que contem funções especificas para trabalhar com uma tabela.
*/
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment' // importa o modelo que usaremos no repositorio
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository' // importa o interface que usaremos no repositorio
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO'; // DTO: Data Transfer Object  é um objeto que representa os dados que serão enviados para o serviço
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';



class FakeAppointmentRepository implements IAppointmentsRepository {

  private appointments: Appointment[] = [];

  public async findByDate(date: Date, provider_id:String): Promise<Appointment | undefined> {

    const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date) && appointment.provider_id === provider_id)  // find retorna um objeto, se não encontrar retorna null
    // console.log(findAppointment)
    return findAppointment;

  }

  public async create({ provider_id, date, user_id  }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = new Appointment();
    appointment.id = uuid();
    appointment.provider_id = provider_id;
    appointment.date = date;
    appointment.user_id = user_id;

    // tambem podemos preenchaer um objeto com o assign do javascript
    // Object.assign(appointment, {id: uuid(), provider_id, date});

    this.appointments.push(appointment);
    return appointment;
  }

  public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment =>
      appointment.provider_id === provider_id &&
      appointment.date.getMonth() + 1 === month &&
      appointment.date.getFullYear() === year
    );

    return appointments;
  }

  public async findAllInDayFromProvider({ provider_id, day, month, year }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {

    const appointments = this.appointments.filter(appointment =>
      appointment.provider_id === provider_id &&
      appointment.date.getDate() === day &&
      appointment.date.getMonth() + 1 === month &&
      appointment.date.getFullYear() === year
    );

    return appointments;

  }

  

}

export default FakeAppointmentRepository;
