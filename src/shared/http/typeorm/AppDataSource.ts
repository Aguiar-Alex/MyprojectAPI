import { DataSource } from 'typeorm';
import { CreateProducts1676936872635 } from './mygrations/1677022182177-CreateProducts';
import { CreateUsers1677960749614 } from './mygrations/1677960749614-CreateUsers';
import Product from '@modules/products/typeorm/entities/Product';
import User from '@modules/users/typeorm/entities/User';
import { UserToken1679615832455 } from './mygrations/1679615832455-User_Token';
import UserToken from '@modules/users/typeorm/entities/UserToken';
import { CreateCustomers1681561631147 } from './mygrations/1681561631147-CreateCustomers';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [],
  migrations: [
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