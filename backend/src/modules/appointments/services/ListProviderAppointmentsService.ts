import { inject, injectable } from "tsyringe";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import ICacheProvider from "@shared/providers/CacheProvider/models/ICacheProvider";
import { instanceToInstance } from "class-transformer";

interface Request {
  provider_id: string,
  month: number,
  year: number,
  day: number,
}


@injectable()
export default class ListProviderAppointmentsService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ provider_id, month, year, day }: Request): Promise<Appointment[]> {

    let appointments = await this.cacheProvider.recover<Appointment[]>(`provider-appointments:${provider_id}:${year}-${month}-${day}`);

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id,
        month,
        year,
        day,
      });

      await this.cacheProvider.save(`provider-appointments:${provider_id}:${year}-${month}-${day}`, instanceToInstance(appointments));

    }
    return instanceToInstance(appointments);



  }

}
