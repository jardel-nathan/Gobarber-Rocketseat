import User from "@modules/users/infra/typeorm/entities/User";
import { inject, injectable } from "tsyringe";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import { getDate, getDaysInMonth, getHours, isAfter } from "date-fns"; // importando a função getDaysInMonth  do pacote date-fns que irá retornar o número de dias do mês

interface Request {
  provider_id: string,
  day: number,
  month: number,
  year: number,
}

type IResponse = Array<{ // interface do tipo array que irá receber um objeto com dois atributos
  hour: number,
  available: boolean,
}>;

@injectable()
export default class ListProviderDayAvailabilityService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({ provider_id, day, month, year }: Request): Promise<IResponse> {


    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year,
    });


    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {

      const hasAppointmentInHour = appointments.find(appointment =>
        getHours(appointment.date) === hour
      );


        const compareDate = new Date(year, month - 1, day, hour);


        return {
          hour,
          available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
        }
    })


    return availability;



  }

}
