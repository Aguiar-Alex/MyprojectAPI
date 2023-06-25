import AppError from '@shared/infra/http/errors/AppErrors';
import User from '../infra/typeorm/entities/User';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
}

export default class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await UsersRepository.findByID(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}
