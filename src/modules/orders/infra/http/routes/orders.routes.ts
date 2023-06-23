import { Router } from 'express';
import OrdersController from '../controller/OrdersController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { Joi, Segments, celebrate } from 'celebrate';

const ordersRoutes = Router();
const ordersController = new OrdersController();
ordersRoutes.use(isAuthenticated);

ordersRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show,
);

ordersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create,
);

export default ordersRoutes;
