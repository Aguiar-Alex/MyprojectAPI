import { PostgresDataSource } from '@shared/http/typeorm/AppDataSource';
import Product from '../typeorm/entities/Product';

export default class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = PostgresDataSource.getRepository(Product);

    const products = productRepository.find();

    return products;
  }
}
