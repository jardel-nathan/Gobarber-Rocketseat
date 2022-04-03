import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderAppointmentsService from './ListProviderAppointmentsService';

import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';

let listProvidersAppointmentsService: ListProviderAppointmentsService;
let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {

  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvidersAppointmentsService = new ListProviderAppointmentsService(fakeAppointmentRepository, fakeCacheProvider);
  })


it('should be able to list the appointments on a especific day ', async () => {

 const appointment1 = await fakeAppointmentRepository.create({
    provider_id: 'user',
    user_id: 'user',
    date: new Date(2020, 4, 20, 8, 0, 0),
  });

  const appointment2 = await fakeAppointmentRepository.create({
    provider_id: 'user',
    user_id: 'user',
    date: new Date(2020, 4, 20, 9, 0, 0),
  });

  const appointment3 = await fakeAppointmentRepository.create({
    provider_id: 'user',
    user_id: 'user',
    date: new Date(2020, 4, 20, 10, 0, 0),
  });

  const appointments = await listProvidersAppointmentsService.execute({
    provider_id: 'user',
    year: 2020,
    month: 5,
    day: 20,
  });

  expect(appointments).toEqual([
    appointment1,
    appointment2,
    appointment3,
  ]);


})

})
