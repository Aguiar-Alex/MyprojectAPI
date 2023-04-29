import Customers from '@modules/customers/typeorm/entities/Customers';
import Order from '@modules/orders/typeorm/entities/Order';
import { PostgresDataSource } from '@shared/http/typeorm/AppDataSource';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}
interface IRequest {
  customer: Customers;
  products: IProduct[];
}

export const OrdersRepository = PostgresDataSource.getRepository(Order).extend({
  async findByID(id: string) {
    const order = await this.findOneBy({ id });
    await this.find({
      relations: ['order_products', 'customer'],
    });
    return order;
  },
  async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);
    return order;
  },
});
