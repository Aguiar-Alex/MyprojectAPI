import { Router } from 'express';
import productsRouter from '@modules/products/routes/productsroutes';
import userRouter from '@modules/users/routes/usersroutes';
import sessionRouter from '@modules/users/routes/sessionsroutes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
