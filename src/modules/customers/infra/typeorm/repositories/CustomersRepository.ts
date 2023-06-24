import { PostgresDataSource } from '@shared/infra/typeorm/AppDataSource';
import Customers from '../entities/Customers';
import { Repository } from 'typeorm';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
/*
export const CustomersRepository = PostgresDataSource.getRepository(
  Customers,
).extend({
  async findByID(id: string) {
    const customer = await this.findOneBy({ id });
    return customer;
  },
  async findByName(name: string) {
    const customer = await this.findOneBy({ name });
    return customer;
  },
  async findByEmail(email: string) {
    const customer = await this.findOneBy({ email });
    return customer;
  },
});
*/

export default class CustomersRepository implements ICustomerRepository {
  private ormRepository: Repository<Customers>;

  constructor() {
    this.ormRepository = PostgresDataSource.getRepository(Customers);
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customers> {
    const customer = this.ormRepository.create({ name, email });
    await this.ormRepository.save(customer);
    return customer;
  }

  public async save(customer: Customers): Promise<Customers> {
    await this.ormRepository.save(customer);
    return customer;
  }

  public async findByID(id: string): Promise<Customers | null> {
    const customer = await this.ormRepository.findOneBy({ id });
    return customer;
  }

  public async findByName(name: string): Promise<Customers | null> {
    const customer = await this.ormRepository.findOneBy({ name });
    return customer;
  }

  public async findByEmail(email: string): Promise<Customers | null> {
    const customer = await this.ormRepository.findOneBy({ email });
    return customer;
  }
}