import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';



export default class AppointmentController {


  public async create(request: Request, response: Response): Promise<Response> {

    const user_id = request.user.id;
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService); // instanciando o service

    const appointment = await createAppointment.execute({ // chama o execute da classe CreateAppointmentService passando os parametros
      date: parsedDate,
      provider_id,
      user_id,
    });

    return response.json(appointment);

  }

}



