import { IProducts } from '../models/IProduct';

export interface IProductPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: IProducts[];
}
