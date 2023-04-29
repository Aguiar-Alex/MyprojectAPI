import { PostgresDataSource } from '@shared/http/typeorm/AppDataSource';
import Product from '../Product';
import { In } from 'typeorm';

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
