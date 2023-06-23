import AppError from '@shared/infra/http/errors/AppErrors';
import { PostgresDataSource } from '@shared/infra/typeorm/AppDataSource';
import Product from '../infra/typeorm/entities/Product';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductRepository';
import redisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productRepository = PostgresDataSource.getRepository(Product);

    const product = await productRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found !');
    }

    const productsExists = await ProductsRepository.findByName(name);

    if (productsExists && name != product.name) {
      throw new AppError('There is already one product with this name');
    }

    // const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  }
}
