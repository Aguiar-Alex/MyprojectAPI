import AppError from '@shared/infra/http/errors/AppErrors';
import { PostgresDataSource } from '@shared/infra/typeorm/AppDataSource';
import Customers from '../infra/typeorm/entities/Customers';
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customers> {
    const customerRepository = PostgresDataSource.getRepository(Customers);

    const customer = await CustomersRepository.findByID(id);

    if (!customer) {
      throw new AppError('Customer not found !');
    }

    const customerExists = await CustomersRepository.findByEmail(email);

    if (customerExists && email != customer.email) {
      throw new AppError('There is already one customer with this email');
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }
}
