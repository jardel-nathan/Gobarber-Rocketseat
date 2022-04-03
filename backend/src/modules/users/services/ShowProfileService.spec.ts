
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppErrors';
import ShowProfileService from './ShowProfileService'

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;


describe('UpdateProfile', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  })

  it('should able to return user', async () => {



    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@email',
      password: '123456'
    });


    const userShow = await showProfileService.execute({
      user_id: user.id,
    });

    expect(userShow.name).toBe('John Doe');
    expect(userShow.email).toBe('test@email');
    expect(userShow.id).toBe(user.id);



  })

  it('should not be able to return user with non-existing id', async () => {

      await expect(showProfileService.execute({
        user_id: 'non-existing-id',
      })).rejects.toBeInstanceOf(AppError);

    })




})
