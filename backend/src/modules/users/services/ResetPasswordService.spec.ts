
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppErrors';

// define o tipo das variaveis que serao usadas nos testes
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {

  // beforeEach in jest is a hook that runs before each test in this case it runs before each test in this describe
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    );


  });

  it('should be able to recover the password using the email', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@email.com',
      password: '123456',
    });


    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      token: token,
      password: '123123',
    });

    const userChangedPassword = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(userChangedPassword?.password).toBe('123123');


  })

  it('should not be able to reset de password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to reset the password with non-existing user', async () => {

    const { token } = await fakeUserTokensRepository.generate('non-existing-user');

    await expect(
      resetPasswordService.execute({
        token: token,
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);

  })

  
  it('should not be able to reset the password if passed more than 2 hours', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@mail.com',
      password: '123456',
    });


    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    })

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await expect(
      resetPasswordService.execute({
        token: token,
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);



  })


})
