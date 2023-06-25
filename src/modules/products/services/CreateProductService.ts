import AppError from '@shared/infra/http/errors/AppErrors';
import redisCache from '@shared/cache/RedisCache';
import { ICreateProducts } from '../domain/models/ICreateProducts';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { inject, injectable } from 'tsyringe';
import { IProducts } from '../domain/models/IProduct';

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}
  public async execute({
    name,
    price,
    quantity,
  }: ICreateProducts): Promise<IProducts | undefined> {
    const productsExists = await this.productRepository.findByName(name);

    if (productsExists) {
      throw new AppError('There is already one product with this name');
    }

    // const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    const product = await this.productRepository.create({
      name,
      price,
      quantity,
    });
    return product;
  }
}
