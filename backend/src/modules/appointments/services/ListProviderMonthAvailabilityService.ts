import { inject, injectable } from "tsyringe";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import { getDate, getDaysInMonth, isAfter, isBefore } from "date-fns"; // importando a função getDaysInMonth  do pacote date-fns que irá retornar o número de dias do mês

interface Request {
  provider_id: string,
  month: number,
  year: number,
}

type IResponse = Array<{ // interface do tipo array que irá receber um objeto com dois atributos
  day: number,
  available: boolean,
}>;

@injectable()
export default class ListProviderMonthAvailabilityService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({ provider_id, month, year }: Request): Promise<IResponse> {



    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id: provider_id,
      month,
      year,
    });


    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1)); // -1 porque o mês começa em 0 (janeiro)

    const eachDayArray = Array.from( // Array.from( ) é uma função que transforma um array em outro array
      { length: numberOfDaysInMonth },  // o primeiro parâmetro do array.from é um objeto que tem o length como propriedade
      (_, index) => index + 1, // o segunto parâmetro do array.from é uma função
    );

    const availability = eachDayArray.map(day => { // criando um array de objetos com dois atributos, day e available
      
      const compareDate = new Date(year, month - 1, day, 23, 59, 59); // -1 porque o mês começa em 0 (janeiro)

      const appointmentsInDay = appointments.filter(appointment => { // filtrando os appointments que são do dia em questão
        return getDate(appointment.date) === day ; // retornando o dia do appointment
      });

      return {
        day,
        available: isBefore(new Date, compareDate) && appointmentsInDay.length < 10,
      };

    })


    return availability;



  }

}
