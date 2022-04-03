import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';

import { container } from 'tsyringe';

export default class ProviderAppointmentsController {

  public async index(request: Request, response: Response): Promise<Response> {

   

    const provider_id = request.user.id;
    const { month, day, year } = request.query;

    const listProviderAppointmentsService = container.resolve(ListProviderAppointmentsService); // instanciando o service

    const appointments = await listProviderAppointmentsService.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });

    return response.json(instanceToInstance(appointments));

  }

}
