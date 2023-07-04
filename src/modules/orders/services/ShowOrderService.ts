import AppError from '@shared/infra/http/errors/AppErrors';
import { IShowOrder } from '../domain/models/IShowOrder';
import { inject, injectable } from 'tsyringe';
import { IOrder } from '../domain/models/IOrder';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';

@injectable()
export default class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}
  public async execute({ id }: IShowOrder): Promise<IOrder> {
    const order = await this.ordersRepository.findByID(id);

    if (!order) {
      throw new AppError('Order not found .');
    }
    return order;
  }
}
