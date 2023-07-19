import 'reflect-metadata';
export {} from 'ts-jest';
import CreateUserService from './CreateUsersService';
import FakeUserRepository from '../domain/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/infra/http/errors/AppErrors';

let fakeUserRepository: FakeUserRepository;
let createUser: CreateUserService;
let fakehashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakehashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUserRepository, fakehashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Antonio',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not  be able to create two users with the same email', async () => {
    await createUser.execute({
      name: 'Antonio',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Antonio',
        email: 'teste@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
