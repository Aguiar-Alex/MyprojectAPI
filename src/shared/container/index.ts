import { container } from 'tsyringe';

import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UsersTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IUserTokenRepository } from 'dist/modules/users/domain/repositories/IUserTokenRepository';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';

container.registerSingleton<ICustomerRepository>(
  'CustomersRepository',
  CustomersRepository,
);
container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UsersTokenRepository,
);
container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductsRepository,
);
container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);
