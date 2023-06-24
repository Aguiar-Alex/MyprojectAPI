import { Request, Response } from 'express';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomersService';
import ListCustomerService from '@modules/customers/services/ListCustomerService';
import ShowCustomerService from '@modules/customers/services/ShowCustomerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import { container } from 'tsyringe';

export default class CustomersController {
  // método de listagem

  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const listCustomers = new ListCustomerService();

    const customers = await listCustomers.execute({ page, limit });

    return response.json(customers);
  }
  // método exibição do produto

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomers = new ShowCustomerService();

    const customers = await showCustomers.execute({ id });

    return response.json(customers);
  }
  // método criação do produto
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({
      name,
      email,
    });
    return response.json(customer);
  }
  // método atualização do produto
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustomer = new UpdateCustomerService();

    const customer = await updateCustomer.execute({
      id,
      name,
      email,
    });

    return response.json(customer);
  }
  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    const deleteCustomer = new DeleteCustomerService();

    await deleteCustomer.execute({ id });

    return response.json([]);
  }
}
