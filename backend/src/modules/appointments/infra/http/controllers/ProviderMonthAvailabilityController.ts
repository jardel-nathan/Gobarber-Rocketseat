import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ListProviderMonthAvailabilityController {

  public async index(request: Request, response: Response): Promise<Response> {


    const provider_id = request.params.provider_id;
    const { month, year } = request.query;
    

    const listProviderMonthAvailabilityService = container.resolve(ListProviderMonthAvailabilityService); // instanciando o service

    const appointment = await listProviderMonthAvailabilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(appointment);

  }

}
