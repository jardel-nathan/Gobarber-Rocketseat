import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import {INotificationsRepository} from '@modules/notifications/repositories/INotificationsRepository';
import { getMongoRepository, Raw, MongoRepository } from 'typeorm'; // importa o getMongoRepository e Repository
import  Notification  from '../schemas/Notification';






 class NotificationRepository implements INotificationsRepository{
   // estaremos extendendo o Repository para que possamos utilizar nesta classe os metodos padrão do Repository
   // implementa o IAppointmentsRepository interface com os metodos padrão do Repository

  private MongodbRepository: MongoRepository<Notification>; // MongodbRepository é um repositório que é um objeto do tipo Repository
  constructor(){ // construtor da classe
    this.MongodbRepository = getMongoRepository(Notification, 'mongo')
  }

  public async create({content, recipient_id}: ICreateNotificationDTO): Promise<Notification>{
    const appointment = this.MongodbRepository.create({recipient_id, content})
    await this.MongodbRepository.save(appointment)
    return appointment;
  }

}

 export default NotificationRepository;
