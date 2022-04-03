import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import {INotificationsRepository} from '@modules/notifications/repositories/INotificationsRepository';
import { getMongoRepository, Raw, MongoRepository } from 'typeorm'; // importa o getMongoRepository e Repository
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification'; 
import {ObjectId} from 'mongodb';



 

 class FakeNotificationRepository implements INotificationsRepository{
   // estaremos extendendo o Repository para que possamos utilizar nesta classe os metodos padrão do Repository
   // implementa o IAppointmentsRepository interface com os metodos padrão do Repository

  private notifications: Notification[] = []; // MongodbRepository é um repositório que é um objeto do tipo Repository

  public async create({content, recipient_id}: ICreateNotificationDTO): Promise<Notification>{
   
    return new Notification();

    // const newNotification = new Notification();
    // newNotification.id = new ObjectId();
    // newNotification.content = content;
    // newNotification.recipient_id = recipient_id;

    // this.notifications.push(newNotification)
    
    // return newNotification
  }

}

 export default FakeNotificationRepository;
