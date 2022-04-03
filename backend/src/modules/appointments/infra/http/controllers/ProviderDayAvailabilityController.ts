import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ListProviderDayAvailabilityController {

  public async index(request: Request, response: Response): Promise<Response> {

    const provider_id = request.params.provider_id;
    const {month, year, day } = request.query;

    const listProviderDayAvailabilityService = container.resolve(ListProviderDayAvailabilityService); // instanciando o service

    const availability = await listProviderDayAvailabilityService.execute({ 
      provider_id,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });

    return response.json(availability);

  }

}
