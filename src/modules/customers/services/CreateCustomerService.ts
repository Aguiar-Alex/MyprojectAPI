import AppError from '@shared/infra/http/errors/AppErrors';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';
import { ICustomer } from '../domain/models/ICustomer';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const emailExists = await this.customerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const customer = await this.customerRepository.create({
      name,
      email,
    });

    return customer;
  }
}
