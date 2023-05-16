import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUsersService';
import ListUserService from '../services/ListUsersService';
import DeleteUserService from '../services/DeleteUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const listUsers = new ListUserService();

    const users = await listUsers.execute({ page, limit });

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    const deleteCustomer = new DeleteUserService();

    await deleteCustomer.execute({ id });

    return response.json([]);
  }
}
