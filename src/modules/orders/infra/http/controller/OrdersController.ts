import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowOrderService from '../../../services/ShowOrderService';
import CreateOrderService from '../../../services/CreateOrderService';
import ListOrderService from '@modules/orders/services/ListOrderService';

export default class OrdersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const listOrders = container.resolve(ListOrderService);

    const customers = await listOrders.execute({ page, limit });

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      customer_id,
      products,
    });

    return response.json(order);
  }
}
