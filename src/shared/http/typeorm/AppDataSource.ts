import { DataSource } from 'typeorm';
import { CreateProducts1676936872635 } from './mygrations/1677022182177-CreateProducts';
import { CreateUsers1677960749614 } from './mygrations/1677960749614-CreateUsers';
import Product from '@modules/products/typeorm/entities/Product';
import User from '@modules/users/typeorm/entities/User';
import { UserToken1679615832455 } from './mygrations/1679615832455-User_Token';
import UserToken from '@modules/users/typeorm/entities/UserToken';
import { CreateCustomers1681561631147 } from './mygrations/1681561631147-CreateCustomers';
import Customers from '@modules/customers/typeorm/entities/Customers';
import { PostRefactoring1681777838954 } from './mygrations/1681777838954-PostRefactoring';
import { RefactorCustomers1681947453766 } from './mygrations/1681947453766-RefactorCustomers';
import { CreateOrders1682379317644 } from './mygrations/1682379317644-Create_Orders';
import { AddCustomerIdToOrders1682380704094 } from './mygrations/1682380704094-AddCustomerIdToOrders';
import { OrdersProducts1682382086011 } from './mygrations/1682382086011-OrdersProducts';
import { AddOrderIdToOrdersProducts1682383037443 } from './mygrations/1682383037443-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1682383680108 } from './mygrations/1682383680108-AddProductIdToOrdersProducts';
import Order from '@modules/orders/typeorm/entities/Order';
import OrderProducts from '@modules/orders/typeorm/entities/OrdersProducts';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [Customers, Order, OrderProducts, Product, User, UserToken],
  migrations: [
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
  // synchronize: true,
});
PostgresDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
