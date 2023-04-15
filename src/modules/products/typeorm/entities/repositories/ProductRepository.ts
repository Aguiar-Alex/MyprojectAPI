import { PostgresDataSource } from '@shared/http/typeorm/AppDataSource';
import Product from '../Product';

export const ProductsRepository = PostgresDataSource.getRepository(
  Product,
).extend({
  async findByName(name: string) {
    const product = this.findOneBy({ name });
    return product;
  },
});
