
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppErrors';
import FakeCacheProvider from "@shared/providers/CacheProvider/fakes/FakeCacheProvider";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('AuthenticateUserService ', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
    authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);;
  });

  it('Should be able to authenticate', async () => {

    await createUserService.execute({
      name: 'John Doe',
      email: 'teste@email.com',
      password: '123456'
    });

    process.env.SECRET = 'secret';
    const userLogged = await authenticateUserService.execute({
      email: 'teste@email.com',
      password: '123456'
    });

    expect(userLogged).toHaveProperty('token');
    expect(userLogged.user.email).toBe('teste@email.com')

  })



  it('Should not be able to authenticate with non existing user', async () => {

    await authenticateUserService.execute({
      email: 'teste@email.com',
      password: '123456'
    }).catch((result) => {
      expect(result).toBeInstanceOf(AppError);
    }
    );
  })


  it('Should not be able to authenticate with wrong password', async () => {


    await createUserService.execute({
      name: 'John Doe',
      email: 'teste@email.com',
      password: '123456'
    });

    expect(
      authenticateUserService.execute({
        email: 'teste@email.com',
        password: 'wrong-password'
      })).rejects.toBeInstanceOf(AppError);

  })



})
