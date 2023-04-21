import AppError from '@shared/http/errors/AppErrors';
import { PostgresDataSource } from '@shared/http/typeorm/AppDataSource';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
}

export default class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const userRepository = PostgresDataSource.getRepository(User);

    const user = await UsersRepository.findByID(id);

    if (!user) {
      throw new AppError('User not found !');
    }

    await userRepository.remove(user);
  }
}
