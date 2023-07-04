import redisCache from '@shared/cache/RedisCache';
import { IProductPaginate } from '../domain/models/IProductPaginate';
import { IProducts } from '../domain/models/IProduct';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { inject, injectable } from 'tsyringe';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export default class ListProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}
  public async execute({
    page,
    limit,
  }: SearchParams): Promise<IProductPaginate | IProducts[]> {
    const productsCache = await redisCache.recover<
      IProductPaginate | IProducts[]
    >('api-vendas-PRODUCT_LIST');

    if (!productsCache) {
      const take = limit;
      const skip = (Number(page) - 1) * take;
      const products = await this.productRepository.findAll({
        page,
        skip,
        take,
      });
      await redisCache.save('api-vendas-PRODUCT_LIST', products);

      return products;
    }

    return productsCache;
  }
}
