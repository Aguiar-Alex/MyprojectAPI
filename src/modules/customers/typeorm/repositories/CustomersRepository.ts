import { PostgresDataSource } from '@shared/http/typeorm/AppDataSource';
import Customers from '../entities/Customers';

export const CustomersRepository = PostgresDataSource.getRepository(
  Customers,
).extend({
  async findByID(id: string) {
    const customer = await this.findOneBy({ id });
    return customer;
  },
  async findByName(name: string) {
    const customer = await this.findOneBy({ name });
    return customer;
  },
  async findByEmail(email: string) {
    const customer = await this.findOneBy({ email });
    return customer;
  },
});
