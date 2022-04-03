
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppErrors';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService'
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let updateProfileService: UpdateProfileService;
let fakeCacheProvider: FakeCacheProvider;

describe('UpdateProfile', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
    updateProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
  })

  it('should be able to update user with correct information', async () => {



    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'test@email',
      password: '123456'
    });


    const userUpdated = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Doe Updated',
      email: 'testupdated@mail.com',
      password: '123',
      old_password: '123456'
    });

    expect(userUpdated.name).toBe('John Doe Updated');
    expect(userUpdated.email).toBe('testupdated@mail.com');

  })


  it(' Should not update a profile wiht duplicated email', async () => {
    await createUserService.execute({
      name: 'John Doe 2',
      email: 'teste2@email.com',
      password: '123456'
    });

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'test@email.com',
      password: '123456'
    });

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Doe Updated',
      email: 'teste2@email.com',
      password: '123',
      old_password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  })


  it('Should not update a non existing Profile', async () => {

    await expect(updateProfileService.execute({
      user_id: 'non-existing-user',
      name: 'John Doe Updated',
      email: 'teste@mail.com',
      password: '123',
      old_password: '123456'
    })).rejects.toBeInstanceOf(AppError);

  })



  it('shoud not be able to update password without old password', async () => {

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'test@email.com',
      password: '123456'
    });


    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Doe Updated',
      email: 'test@mail.com',
      password: '123',
    })).rejects.toBeInstanceOf(AppError);

  })

  // should not be able to update password with wrong old password

  it('shoud not be able to update password without old password', async () => {


    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'test@email.com',
      password: '123456'
    });


    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Doe Updated',
      email: 'test@mail.com',
      password: '123',
      old_password: 'wrong-old-password'
    })).rejects.toBeInstanceOf(AppError);

  })


})
