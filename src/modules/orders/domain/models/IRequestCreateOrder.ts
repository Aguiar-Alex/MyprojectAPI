import { IProductOrder } from './IProductOrder';

export interface IRequestCreateOrder {
  customer_id: string;
  products: IProductOrder[];
}
