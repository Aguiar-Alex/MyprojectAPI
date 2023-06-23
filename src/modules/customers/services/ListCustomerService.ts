import { PostgresDataSource } from '@shared/infra/typeorm/AppDataSource';
import Customers from '../infra/typeorm/entities/Customers';

interface SearchParams {
  page: number;
  limit: number;
}

interface IPaginateCustomer {
  per_page: number;
  total: number;
  current_page: number;
  data: Customers[];
}

export default class ListCustomerService {
  public async execute({
    page,
    limit,
  }: SearchParams): Promise<IPaginateCustomer> {
    const customersRepository = PostgresDataSource.getRepository(Customers);
    const [customers, count] = await customersRepository
      .createQueryBuilder('Customers')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const result = {
      per_page: limit,
      total: count,
      current_page: page,
      data: customers,
    };

    return result as IPaginateCustomer;
  }
}
