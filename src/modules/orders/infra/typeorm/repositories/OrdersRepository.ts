import Order from '../entities/Order';
import { PostgresDataSource } from '@shared/infra/typeorm/AppDataSource';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { Repository } from 'typeorm';
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrderPaginate } from '@modules/orders/domain/models/IOrderPaginate';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export default class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = PostgresDataSource.getRepository(Order);
  }

  public async findByID(id: string): Promise<Order | null> {
    const order = await this.ormRepository.findOneBy({ id });
    await this.ormRepository.find({
      relations: ['order_products', 'customer'],
    });
    return order;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IOrderPaginate> {
    const [orders, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: orders,
    };
    return result;
  }

  public async create({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}
