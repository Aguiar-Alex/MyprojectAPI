import { IProductOrder } from './IProductOrder';

export interface ICustomerOrder {
  customer_id: string;
  products: IProductOrder[];
}
