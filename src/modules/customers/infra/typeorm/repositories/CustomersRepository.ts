import { PostgresDataSource } from '@shared/infra/typeorm/AppDataSource';
import Customers from '../entities/Customers';
import { Repository } from 'typeorm';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

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

  public async remove(customer: Customers) {
    await this.ormRepository.remove(customer);
  }

  public async findByID(id: string): Promise<Customers | null> {
    const customer = await this.ormRepository.findOneBy({ id });
    return customer;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ICustomerPaginate> {
    const [customers, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    };
    return result;
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
