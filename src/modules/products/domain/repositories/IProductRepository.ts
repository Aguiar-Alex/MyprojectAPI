import { ICreateProducts } from '../models/ICreateProducts';
import { IFindProducts } from '../models/IFindProducts';
import { IProducts } from '../models/IProduct';
import { IProductPaginate } from '../models/IProductPaginate';
import { IUpdateStockProducts } from '../models/IUpdateStockProducts';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IProductRepository {
  findByID(id: string): Promise<IProducts | null>;
  findByName(name: string): Promise<IProducts | null>;
  findAll({ page, skip, take }: SearchParams): Promise<IProductPaginate>;
  findAllByIds(products: IFindProducts[]): Promise<IProducts[]>;
  create(data: ICreateProducts): Promise<IProducts>;
  save(product: ICreateProducts): Promise<IProducts>;
  updateStock(products: IUpdateStockProducts[]): Promise<void>;
  remove(product: ICreateProducts): Promise<void>;
}
