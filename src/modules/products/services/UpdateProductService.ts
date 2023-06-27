import AppError from '@shared/infra/http/errors/AppErrors';
import redisCache from '@shared/cache/RedisCache';
import { IUpdateProducts } from '../domain/models/IUpdateProducts';
import { IProducts } from '../domain/models/IProduct';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductRepository,
  ) {}
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProducts): Promise<IProducts> {
    const product = await this.productsRepository.findByID(id);

    if (!product) {
      throw new AppError('Product not found !');
    }

    const productsExists = await this.productsRepository.findByName(name);

    if (productsExists && name != product.name) {
      throw new AppError('There is already one product with this name');
    }

    // const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productsRepository.save(product);

    return product;
  }
}
