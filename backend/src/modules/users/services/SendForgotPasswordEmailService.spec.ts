
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import AppError from '@shared/errors/AppErrors';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

import FakeMailProvider from '@shared/providers/MailProvider/fakes/FakeMailProvider';

import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';


let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;



describe('SendForgotPasswordEmail', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );

  });

  it('should be able to recover the password using the email', async () => {

    const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@email.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'test@email.com',
    });

    expect(sendEmail).toHaveBeenCalled();

  })


  it('should not be able to recover a non-existing user password', async () => {

    expect(sendForgotPasswordEmail.execute({
      email: 'fakemail@mail.com'
    })).rejects.toBeInstanceOf(AppError);

  })


  it('should generate a forgot password token', async () => {

    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@email.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'test@email.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);

  })

})
