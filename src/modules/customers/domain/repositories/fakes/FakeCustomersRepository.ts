import { v4 as uuidv4 } from 'uuid';
import Customers from '@modules/customers/infra/typeorm/entities/Customers';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export default class FakeCustomersRepository implements ICustomerRepository {
  private customers: Customers[] = [];

  public async create({ name, email }: ICreateCustomer): Promise<Customers> {
    const customer = new Customers();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: Customers): Promise<Customers> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );

    this.customers[findIndex] = customer;

    return customer;
  }

  public async remove(customer: Customers): Promise<void> {}

  public async findByID(id: string): Promise<Customers | null> {
    const customer = this.customers.find(customer => customer.id === id);

    return customer as Customers;
  }

  public async findByName(name: string): Promise<Customers | null> {
    const customer = this.customers.find(customer => customer.name === name);

    return customer as Customers;
  }

  public async findByEmail(email: string): Promise<Customers | null> {
    const customer = this.customers.find(customer => customer.email === email);

    return customer as Customers;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ICustomerPaginate> {
    const customerPaginate = {
      per_page: take,
      total: 1,
      current_page: page,
      data: this.customers,
    };

    return customerPaginate;
  }
}
