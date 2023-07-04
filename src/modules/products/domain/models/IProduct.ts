import { IOrderProducts } from '@modules/orders/domain/models/IOrderProducts';

export interface IProducts {
  id: string;
  order_products?: IOrderProducts[];
  name: string;
  price: number;
  quantity: number;
  created_at: Date;
  update_at: Date;
}
