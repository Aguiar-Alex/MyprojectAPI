import AppError from '@shared/infra/http/errors/AppErrors';
import { PostgresDataSource } from '@shared/infra/typeorm/AppDataSource';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import UserToken from '../infra/typeorm/entities/UserToken';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest) {
    const userTokenRepository = PostgresDataSource.getRepository(UserToken);

    const userToken = await userTokenRepository.findOneBy({ token });

    if (!userToken) {
      throw new AppError('User Token does not exists .');
    }
    const user = await UsersRepository.findByID(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists .');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired .');
    }

    user.password = await hash(password, 8);

    await UsersRepository.save(user);
  }
}
