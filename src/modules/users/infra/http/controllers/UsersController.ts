import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUsersService';
import ListUserService from '@modules/users/services/ListUsersService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import { instanceToInstance } from 'class-transformer';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const listUsers = container.resolve(ListUserService);

    const users = await listUsers.execute({ page, limit });

    return response.json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    const deleteCustomer = container.resolve(DeleteUserService);

    await deleteCustomer.execute({ id });

    return response.json([]);
  }
}
