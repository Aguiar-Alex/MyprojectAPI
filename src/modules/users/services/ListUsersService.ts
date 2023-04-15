import { PostgresDataSource } from '@shared/http/typeorm/AppDataSource';
import User from '../typeorm/entities/User';

export default class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = PostgresDataSource.getRepository(User);

    const users = userRepository.find();

    return users;
  }
}
