import AppError from '@shared/http/errors/AppErrors';
import { PostgresDataSource } from '@shared/http/typeorm/AppDataSource';
import Product from '../typeorm/entities/Product';

interface IRequest {
  id: string;
}

export default class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = PostgresDataSource.getRepository(Product);

    const product = await productRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found !');
    }

    await productRepository.remove(product);
  }
}