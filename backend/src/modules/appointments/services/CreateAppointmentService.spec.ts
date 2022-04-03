// arquivo de teste para CreateAppointmentService
import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import AppError from "@shared/errors/AppErrors";
import FakeNotificationRepository from "@modules/notifications/repositories/fakes/FakeNotificationRepository";
import FakeCacheProvider from "@shared/providers/CacheProvider/fakes/FakeCacheProvider";

// describe(): cria um bloco que agrupa vários testes relacionados.

// it()/test(): cria um teste.

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationRepository: FakeNotificationRepository;
let fakeCacheProvider: FakeCacheProvider;

describe("CreateAppointmentService", () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationRepository  = new FakeNotificationRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository, fakeNotificationRepository, fakeCacheProvider);
  })

  it("should be able to create a new appointment", async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 12).getTime();
    });

    expect(createAppointment.execute({
      date: new Date(2023, 4, 20, 13),
      provider_id: "12",
      user_id: "1"
    })).resolves.toHaveProperty("id");

  });

  it("should not be able to create two appointments on the same time", async () => {



    const dateTest = new Date(2020, 4, 20, 12);
    
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 18, 12).getTime();
    });

    await createAppointment.execute({
      date: dateTest,
      provider_id: "12",
      user_id: "1"
    });


    // nao entendi o porque de precisar usar o rejects e nao poder pegar o valor retornado e depois comparar como fizemos no teste de cima
    await expect(createAppointment.execute({
      date: dateTest,
      provider_id: "12",
      user_id: "1"
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to create an appointment on a past date', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 20, 11),
      provider_id: '12',
      user_id: '1'
    })).rejects.toBeInstanceOf(AppError);


    await expect(createAppointment.execute({
      date: new Date(2020, 4, 19, 11),
      provider_id: '12',
      user_id: '1'
    })).rejects.toBeInstanceOf(AppError);

  })

  it('should not be able to create an appointment with same user as provider', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 22, 15),
      provider_id: '123123',
      user_id: '123123'
    })).rejects.toBeInstanceOf(AppError);

  })

  it('should not be able to create an appointment before 8am and after 5pm', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 18, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 20, 7),
      provider_id: '12',
      user_id: '1'
    })).rejects.toBeInstanceOf(AppError);

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 20, 18),
      provider_id: '12',
      user_id: '1'
    })).rejects.toBeInstanceOf(AppError);


  })

  



})
