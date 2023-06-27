import AppError from '@shared/infra/http/errors/AppErrors';
import redisCache from '@shared/cache/RedisCache';
import { IDeleteProducts } from '../domain/models/IDeleteProducts';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';

@injectable()
export default class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({ id }: IDeleteProducts): Promise<void> {
    const product = await this.productRepository.findByID(id);

    if (!product) {
      throw new AppError('Product not found !');
    }

    // const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productRepository.remove(product);
  }
}
