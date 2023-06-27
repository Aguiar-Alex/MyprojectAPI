import { PostgresDataSource } from '@shared/infra/typeorm/AppDataSource';
import { In, Repository } from 'typeorm';
import Product from '../entities/Product';
import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { ICreateProducts } from '@modules/products/domain/models/ICreateProducts';

export default class ProductsRepository implements IProductRepository {
  constructor(private ormRepository: Repository<Product>) {
    this.ormRepository = PostgresDataSource.getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProducts): Promise<Product> {
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);
    return product;
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async findByID(id: string): Promise<Product | null> {
    const product = await this.ormRepository.findOneBy({ id });
    return product;
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = this.ormRepository.findOneBy({ name });

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existsProducts = this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existsProducts;
  }
}
