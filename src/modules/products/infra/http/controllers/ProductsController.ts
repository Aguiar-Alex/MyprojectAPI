import { Request, Response } from 'express';
import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductSevice';
import ListProductService from '@modules/products/services/ListProductService';
import ShowProductService from '@modules/products/services/ShowProductsService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import { container } from 'tsyringe';

export default class ProductsController {
  // método de listagem

  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const listProducts = new ListProductService();

    const products = await listProducts.execute({ page, limit });

    return response.json(products);
  }
  // método exibição do produto

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = new ShowProductService();

    const product = await showProduct.execute({ id });

    return response.json(product);
  }
  // método criação do produto
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProducts = container.resolve(CreateProductService);

    const product = await createProducts.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }
  // método atualização do produto
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProducts = new UpdateProductService();

    const product = await updateProducts.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }
  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({ id });

    return response.json([]);
  }
}
