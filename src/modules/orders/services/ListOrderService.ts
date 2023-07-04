import { inject, injectable } from 'tsyringe';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { IOrderPaginate } from '../domain/models/IOrderPaginate';

interface SearchParams {
  page: number;
  limit: number;
}
@injectable()
export default class ListOrderService {
  constructor(
    @inject('OrdersRepository')
    private orderRepository: IOrdersRepository,
  ) {}

  public async execute({ page, limit }: SearchParams): Promise<IOrderPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const orders = await this.orderRepository.findAll({
      page,
      skip,
      take,
    });

    return orders;
  }
}
