
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppErrors';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let updateUserAvatarService: UpdateUserAvatarService;
let fakeStorageProvider: FakeStorageProvider;
let fakeCacheProvider: FakeCacheProvider;



describe('UpdateUserAvatar', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeStorageProvider = new FakeStorageProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
    updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);
  })

  it('should be able to updatar avatar image', async () => {



    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'test@email',
      password: '123456'
    });


    const userUpdated = await updateUserAvatarService.execute({
      user_id: user.id,
      avatar_filename: 'avatar.jpg'
    });

    expect(userUpdated.avatar).toBe('avatar.jpg');

  })

  it('should not be able to update avatar from non existing user', async () => {


    await expect(updateUserAvatarService.execute({
      user_id: 'non-existing-user',
      avatar_filename: 'avatar.jpg'
    })).rejects.toBeInstanceOf(AppError);

  });



  it('should delete old avatar when updating new one', async () => {

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

  

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'test@email',
      password: '123456'
    });


    await updateUserAvatarService.execute({
      user_id: user.id,
      avatar_filename: 'avatar.jpg'
    });


    await updateUserAvatarService.execute({
      user_id: user.id,
      avatar_filename: 'avatar2.jpg'
    });


    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

  })




})
