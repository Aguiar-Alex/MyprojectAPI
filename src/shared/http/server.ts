import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import routes from './routes';
import AppError from '@shared/http/errors/AppErrors';
import '@shared/http/typeorm/AppDataSource';
import uploadConfig from '@config/upload';
import rateLimiter from './middlewares/ratelimiter';

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error._statusCode).json({
        status: 'error',
        message: error._message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error !',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333 !');
});
