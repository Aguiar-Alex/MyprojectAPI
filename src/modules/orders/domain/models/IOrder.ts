import Customers from '@modules/customers/infra/typeorm/entities/Customers';
import OrderProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';

export interface IOrder {
  id: string;
  customer?: Customers;
  order_products?: OrderProducts[];
  created_at: Date;
  update_at: Date;
}
