import AppError from '@shared/http/errors/AppErrors';
import { PostgresDataSource } from '@shared/http/typeorm/AppDataSource';
import Customers from '../typeorm/entities/Customers';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

export default class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customerRepository = PostgresDataSource.getRepository(Customers);

    const customer = await CustomersRepository.findByID(id);

    if (!customer) {
      throw new AppError('Customer not found !');
    }

    await customerRepository.remove(customer);
  }
}
