import { PostgresDataSource } from '@shared/http/typeorm/AppDataSource';
import Customers from '../typeorm/entities/Customers';

export default class ListCustomerService {
  public async execute(): Promise<Customers[]> {
    const customersRepository = PostgresDataSource.getRepository(Customers);

    const customers = customersRepository.find();

    return customers;
  }
}
