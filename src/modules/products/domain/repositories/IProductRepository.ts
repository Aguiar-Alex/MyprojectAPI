import { ICreateProducts } from '../models/ICreateProducts';
import { IFindProducts } from '../models/IFindProducts';
import { IProducts } from '../models/IProduct';

export interface IProductRepository {
  findByName(name: string): Promise<IProducts | null>;
  findAllByIds(products: IFindProducts[]): Promise<IProducts[]>;
  create(data: ICreateProducts): Promise<IProducts>;
  save(product: ICreateProducts): Promise<IProducts>;
}
