import { PostgresDataSource } from '@shared/http/typeorm/AppDataSource';
import Product from '../typeorm/entities/Product';

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
  }: SearchParams): Promise<IPaginateProduct> {
    const productRepository = PostgresDataSource.getRepository(Product);

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

    return result as IPaginateProduct;
  }
}
