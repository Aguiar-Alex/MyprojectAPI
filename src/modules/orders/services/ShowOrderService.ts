import AppError from '@shared/http/errors/AppErrors';
import Order from '../typeorm/entities/Order';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';

interface IRequest {
  id: string;
}

export default class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const order = await OrdersRepository.findByID(id);

    if (!order) {
      throw new AppError('Order not found .');
    }
    return order;
  }
}
