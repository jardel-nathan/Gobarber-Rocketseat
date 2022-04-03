
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppErrors';
import ListProvidersService from './ListProvidersService';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;
describe('ListAllUsers', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvidersService = new ListProvidersService(fakeUsersRepository, fakeCacheProvider);
  })

  it('should able to return all users', async () => {

   const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'teste@mail.com',
      password: '123456'
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'test2@mail.com',
      password: '123456'
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'test@gmail.com',
      password: '123456'
    });



    const allUsers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(allUsers).toEqual([user1, user2]);




  })




})
