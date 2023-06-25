import { PostgresDataSource } from '@shared/infra/typeorm/AppDataSource';
import User from '../entities/User';
import { Repository } from 'typeorm';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';

export default class UsersRepository implements IUserRepository {
  constructor(private ormRepository: Repository<User>) {
    this.ormRepository = PostgresDataSource.getRepository(User);
  }

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);
    return user;
  }

  public async findByID(id: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({ id });

    return user;
  }

  public async findByName(name: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({ name });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({ email });

    return user;
  }
}
