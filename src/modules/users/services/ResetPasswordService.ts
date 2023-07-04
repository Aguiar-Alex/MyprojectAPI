import AppError from '@shared/infra/http/errors/AppErrors';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import { IResetPassword } from '../domain/models/IResetPassword';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUserTokenRepository } from '../domain/repositories/IUserTokenRepository';

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute({ token, password }: IResetPassword) {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists .');
    }
    const user = await this.userRepository.findByID(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists .');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired .');
    }

    user.password = await hash(password, 8);

    await this.userRepository.save(user);
  }
}
