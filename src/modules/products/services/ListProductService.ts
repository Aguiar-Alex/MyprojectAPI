import { PostgresDataSource } from '@shared/http/typeorm/AppDataSource';
import Product from '../typeorm/entities/Product';
import redisCache from '@shared/cache/RedisCache';

interface SearchParams {
  page: number;
  limit: number;
}

interface IPaginateProduct {
  per_page: number;
  total: number;
  current_page: number;
  data: Product[];
}

export default class ListProductService {
  public async execute({
    page,
    limit,
  }: SearchParams): Promise<IPaginateProduct | Product[]> {
    const productRepository = PostgresDataSource.getRepository(Product);

    //const redisCache = new RedisCache();

    const productsCache = await redisCache.recover<
      IPaginateProduct | Product[]
    >('api-vendas-PRODUCT_LIST');

    if (!productsCache) {
      const [products, count] = await productRepository
        .createQueryBuilder('Products')
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      const result = {
        per_page: limit,
        total: count,
        current_page: page,
        data: products,
      };

      await redisCache.save('api-vendas-PRODUCT_LIST', result);

      return result;
    }

    return productsCache;
  }
}
