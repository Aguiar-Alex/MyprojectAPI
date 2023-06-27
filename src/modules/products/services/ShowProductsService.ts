import AppError from '@shared/infra/http/errors/AppErrors';
import { IShowProduct } from '../domain/models/IShowProduct';
import { IProducts } from '../domain/models/IProduct';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';

@injectable()
export default class ShowProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({ id }: IShowProduct): Promise<IProducts | undefined> {
    const product = await this.productRepository.findByID(id);

    if (!product) {
      throw new AppError('Product not found !');
    }

    return product;
  }
}
