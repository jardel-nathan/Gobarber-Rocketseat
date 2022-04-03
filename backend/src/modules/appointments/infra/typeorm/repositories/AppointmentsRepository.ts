/*
Repositórios:
os repositórios são classes que contem funções especificas para trabalhar com uma tabela.
*/

import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO'; // DTO: Data Transfer Object  é um objeto que representa os dados que serão enviados para o serviço
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'; // importa o modelo que usaremos no repositorio
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'; // importa o interface que usaremos no repositorio
import { getRepository, Raw, Repository } from 'typeorm'; // importa o getRepository e Repository






 class AppointmentsRepository implements IAppointmentsRepository{
   // estaremos extendendo o Repository para que possamos utilizar nesta classe os metodos padrão do Repository
   // implementa o IAppointmentsRepository interface com os metodos padrão do Repository

  private ormRepository: Repository<Appointment>; // ormRepository é um repositório que é um objeto do tipo Repository
  constructor(){ // construtor da classe
    this.ormRepository = getRepository(Appointment, 'pg')
  }

  // cria um novo agendamento   -  o async é para que o metodo seja assincrono
  public async findByDate(date:Date, provider_id:string): Promise<Appointment | undefined>{
    // findOne retorna um objeto, se não encontrar retorna null
    const findAppointment = await this.ormRepository.findOne({where: {date, provider_id}})
    // se encontrar retorna o agendamento
    return findAppointment;
  }

  public async create({provider_id, date, user_id}: ICreateAppointmentsDTO): Promise<Appointment>{
    const appointment = this.ormRepository.create({provider_id, date, user_id})
    await this.ormRepository.save(appointment)
    return appointment;
  }

  public async findAllInMonthFromProvider({provider_id, month, year}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>{

    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
        )
      },
      relations: ['user']
    })

    return appointments;


  }

  public async findAllInDayFromProvider({provider_id, day, month, year}: IFindAllInDayFromProviderDTO): Promise<Appointment[]>{

    const parsedMonth = String(month).padStart(2, '0'); // padStart: adiciona zeros a esquerda
    const parsedDay = String(day).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName => // RAW: é uma função que permite usar uma string como uma expressão
          `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
        )
      },
      relations: ['user']
    })


    return appointments;

  }

  public async findAllAppointmentsInDayFromProvider(provider_id:string): Promise<Appointment[]>{
    return []
  }


}

 export default AppointmentsRepository;
