import AppError from '@shared/infra/http/errors/AppErrors';
import Customers from '../infra/typeorm/entities/Customers';
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

export default class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customers | undefined> {
    const customer = await CustomersRepository.findByID(id);

    if (!customer) {
      throw new AppError('Customer not found !');
    }

    return customer;
  }
}
