import { PostgresDataSource } from '@shared/infra/typeorm/AppDataSource';
import User from '../entities/User';

export const UsersRepository = PostgresDataSource.getRepository(User).extend({
  async findByID(id: string) {
    const user = await this.findOneBy({ id });
    return user;
  },
  async findByName(name: string) {
    const user = await this.findOneBy({ name });
    return user;
  },
  async findByEmail(email: string) {
    const user = await this.findOneBy({ email });
    return user;
  },
});
