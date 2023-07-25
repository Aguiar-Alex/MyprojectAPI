import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import { PostgresDataSource } from '../typeorm/AppDataSource';

PostgresDataSource.initialize()
  .then(() => {
    const server = app.listen(3333, () => {
      console.log('Server started on port 3333 !');
    });
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
