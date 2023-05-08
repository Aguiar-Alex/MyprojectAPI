import { PostgresDataSource } from '@shared/http/typeorm/AppDataSource';
import { In } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

export const ProductsRepository = PostgresDataSource.getRepository(
  Product,
).extend({
  async findByName(name: string) {
    const product = this.findOneBy({ name });
    return product;
  },
  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existsProducts = this.find({
      where: {
        id: In(productIds),
      },
    });
    return existsProducts;
  },
});
