import { PostgresDataSource } from '@shared/infra/typeorm/AppDataSource';
import UserToken from '../entities/UserToken';
import { IUserTokenRepository } from '@modules/users/domain/repositories/IUserTokenRepository';
import { Repository } from 'typeorm';

export default class UsersTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = PostgresDataSource.getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.ormRepository.findOneBy({ token });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userID = this.ormRepository.create({ user_id });

    await this.ormRepository.save(userID);

    return userID;
  }
}
