import { IOrder } from './IOrder';
import { IProducts } from '@modules/products/domain/models/IProduct';

export interface IOrderProducts {
  id: string;
  order: IOrder;
  product: IProducts;
  price: number;
  quantity: number;
  created_at: Date;
  update_at: Date;
}
