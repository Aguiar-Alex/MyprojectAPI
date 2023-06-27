import AppError from '@shared/infra/http/errors/AppErrors';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';
import { ICustomer } from '../domain/models/ICustomer';

@injectable()
export default class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}
  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<ICustomer> {
    const customer = await this.customersRepository.findByID(id);

    if (!customer) {
      throw new AppError('Customer not found !');
    }

    const customerExists = await this.customersRepository.findByEmail(email);

    if (customerExists && email != customer.email) {
      throw new AppError('There is already one customer with this email');
    }

    customer.name = name;
    customer.email = email;

    await this.customersRepository.save(customer);

    return customer;
  }
}
