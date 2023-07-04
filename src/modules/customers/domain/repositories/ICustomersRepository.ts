import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';
import { ICustomerPaginate } from '../models/ICustomerPaginate';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ICustomerRepository {
  findByID(id: string): Promise<ICustomer | null>;
  findByName(name: string): Promise<ICustomer | null>;
  findByEmail(email: string): Promise<ICustomer | null>;
  findAll({ page, skip, take }: SearchParams): Promise<ICustomerPaginate>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICreateCustomer): Promise<ICustomer>;
  remove(customer: ICreateCustomer): Promise<void>;
}
