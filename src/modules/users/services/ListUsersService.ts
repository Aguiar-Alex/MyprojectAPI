import { PostgresDataSource } from '@shared/http/typeorm/AppDataSource';
import User from '../typeorm/entities/User';

interface SearchParams {
  page: number;
  limit: number;
}

interface IPaginateUser {
  per_page: number;
  total: number;
  current_page: number;
  data: User[];
}

export default class ListUserService {
  public async execute({ page, limit }: SearchParams): Promise<IPaginateUser> {
    const userRepository = PostgresDataSource.getRepository(User);

    const [users, count] = await userRepository
      .createQueryBuilder('Users')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const result = {
      per_page: limit,
      total: count,
      current_page: page,
      data: users,
    };

    return result as IPaginateUser;
  }
}
