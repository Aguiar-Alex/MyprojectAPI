import { v4 as uuidv4 } from 'uuid';
import { ICreateUser } from '../../models/ICreateUser';
import { IUserRepository } from '../IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import { IUserPaginate } from '../../models/IUserPaginate';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export default class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = new User();

    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async remove(user: User): Promise<void> {}

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IUserPaginate> {
    const userPaginate = {
      per_page: take,
      total: 1,
      current_page: page,
      data: this.users,

    };

    return userPaginate;
  }

  public async findByName(name: string): Promise<User | null> {
    const user = this.users.find(user => user.name === name);

    return user as User;
  }

  public async findByID(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id);

    return user as User;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);

    return user as User;
  }
}
