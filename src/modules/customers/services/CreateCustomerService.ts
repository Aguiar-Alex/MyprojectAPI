import AppError from '@shared/infra/http/errors/AppErrors';
import { PostgresDataSource } from '@shared/infra/typeorm/AppDataSource';
import Customers from '../infra/typeorm/entities/Customers';
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({
    name,
    email,
  }: IRequest): Promise<Customers | undefined> {
    const customerRepository = PostgresDataSource.getRepository(Customers);
    const emailExists = await CustomersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);

    return customer;
  }
}
