import AppError from '@shared/http/errors/AppErrors';
import { PostgresDataSource } from '@shared/http/typeorm/AppDataSource';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
}

export default class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const userRepository = PostgresDataSource.getRepository(User);

    const user = await UsersRepository.findByID(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}
