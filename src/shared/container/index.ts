import { container } from 'tsyringe';

import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UsersTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductRepository';

container.registerSingleton('CustomersRepository', CustomersRepository);
container.registerSingleton('UsersRepository', UsersRepository);
container.registerSingleton('UserTokenRepository', UsersTokenRepository);
container.registerSingleton('ProductRepository', ProductsRepository);
