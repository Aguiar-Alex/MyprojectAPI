import AppError from '@shared/infra/http/errors/AppErrors';
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer';
import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
export default class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customerRepository.findByID(id);

    if (!customer) {
      throw new AppError('Customer not found !');
    }

    await this.customerRepository.remove(customer);
  }
}
