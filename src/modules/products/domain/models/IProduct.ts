import OrderProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';

export interface IProducts {
  id: string;
  order_products?: OrderProducts[];
  name: string;
  price: number;
  quantity: number;
  created_at: Date;
  update_at: Date;
}
