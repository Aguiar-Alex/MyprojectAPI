import { DataSource } from 'typeorm';

import Customers from '@modules/customers/infra/typeorm/entities/Customers';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrderProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';
import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

import { CreateProducts1676936872635 } from './mygrations/1677022182177-CreateProducts';
import { CreateUsers1677960749614 } from './mygrations/1677960749614-CreateUsers';
import { UserToken1679615832455 } from './mygrations/1679615832455-User_Token';
import { CreateCustomers1681561631147 } from './mygrations/1681561631147-CreateCustomers';
import { PostRefactoring1681777838954 } from './mygrations/1681777838954-PostRefactoring';
import { RefactorCustomers1681947453766 } from './mygrations/1681947453766-RefactorCustomers';
import { CreateOrders1682379317644 } from './mygrations/1682379317644-Create_Orders';
import { AddCustomerIdToOrders1682380704094 } from './mygrations/1682380704094-AddCustomerIdToOrders';
import { OrdersProducts1682382086011 } from './mygrations/1682382086011-OrdersProducts';
import { AddOrderIdToOrdersProducts1682383037443 } from './mygrations/1682383037443-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1682383680108 } from './mygrations/1682383680108-AddProductIdToOrdersProducts';
import { AddorderToOrders1688331531512 } from './mygrations/1688331531512-AddorderToOrders';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [Customers, Order, OrderProducts, Product, User, UserToken],
  migrations: [
    AddorderToOrders1688331531512,
    AddProductIdToOrdersProducts1682383680108,
    AddOrderIdToOrdersProducts1682383037443,
    OrdersProducts1682382086011,
    AddCustomerIdToOrders1682380704094,
    CreateOrders1682379317644,
    RefactorCustomers1681947453766,
    PostRefactoring1681777838954,
    CreateCustomers1681561631147,
    CreateUsers1677960749614,
    CreateProducts1676936872635,
    UserToken1679615832455,
  ],
});
