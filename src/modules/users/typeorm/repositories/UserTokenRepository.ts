import { PostgresDataSource } from '@shared/http/typeorm/AppDataSource';
import UserToken from '../entities/UserToken';

export const UsersTokenRepository = PostgresDataSource.getRepository(
  UserToken,
).extend({
  async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.findOneBy({ token });
    return userToken;
  },
  async generate(user_id: string): Promise<UserToken> {
    const userID = await this.create({ user_id });
    await this.save(userID);
    return userID;
  },
});
