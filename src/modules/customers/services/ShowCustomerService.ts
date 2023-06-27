import AppError from '@shared/infra/http/errors/AppErrors';
import { IShowCustomer } from '../domain/models/IShowCustomer';
import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';
import { ICustomer } from '../domain/models/ICustomer';

@injectable()
export default class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ id }: IShowCustomer): Promise<ICustomer | undefined> {
    const customer = await this.customerRepository.findByID(id);

    if (!customer) {
      throw new AppError('Customer not found !');
    }

    return customer;
  }
}
