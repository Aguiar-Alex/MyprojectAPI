import AppError from '@shared/infra/http/errors/AppErrors';
import { PostgresDataSource } from '@shared/infra/typeorm/AppDataSource';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  id: string;
}

export default class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const productRepository = PostgresDataSource.getRepository(Product);

    const product = await productRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found !');
    }

    return product;
  }
}
