import AppError from '@shared/infra/http/errors/AppErrors';
import { PostgresDataSource } from '@shared/infra/typeorm/AppDataSource';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';
import { ICustomerOrder } from '../domain/models/ICustomerOrder';
import { IOrder } from '../domain/models/IOrder';
import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';

injectable();
export default class CreateOrderService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomerRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    customer_id,
    products,
  }: ICustomerOrder): Promise<IOrder> {
    const productRepository = PostgresDataSource.getRepository(Product);

    const customerExists = await this.customerRepository.findByID(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }
    const existsProducts = await this.productRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}`,
      );
    }

    const quantityAvaliable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvaliable.length) {
      throw new AppError(
        `The quantity ${quantityAvaliable[0].quantity}
        is not avaliable for ${quantityAvaliable[0].id}`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await OrdersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productRepository.save(updatedProductQuantity);

    return order;
  }
}
