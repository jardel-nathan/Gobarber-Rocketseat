// tsringe is a library that helps you to create dependency injection containers.
// dependency injection containers are used to inject dependencies into your classes.
// containers of dependencies aggregate all the dependencies that are used.
import { container } from "tsyringe";



import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository"; // interface that define the methods that the repository must implement
import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository"; // repository that implements the interface

container.registerSingleton // registerSingleton is a method that register a class as a singleton.
<IAppointmentsRepository> // the type of the class that will be registered
(
  'AppointmentsRepository', //  the name of the class that will be registered
  AppointmentsRepository  // the class that will be injected
); // register the repository in the container


import IUsersRepository from "@modules/users/repositories/IUsersRepository";// interface that define the methods that the repository must implement
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";// repository that implements the interface
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);// register the repository in the container



import IUserTokensRepository from "@modules/users/repositories/IUserTokensRepository";// interface that define the methods that the repository must implement
import UserTokensRepository from "@modules/users/infra/typeorm/repositories/UsersTokensRepository";// repository that implements the interface
container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);// register the repository in the container


import { INotificationsRepository } from "@modules/notifications/repositories/INotificationsRepository";
import NotificationsRepository from "@modules/notifications/infra/typeorm/repositories/NotificationsRepository";
container.registerSingleton<INotificationsRepository>("NotificationsRepository", NotificationsRepository);


import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";// interface that define the methods that the repository must implement
import BCryptHashProvider from "@modules/users/providers/HashProvider/implementations/BCryptHashProvider";// repository that implements the interface
container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);// register the repository in the container

