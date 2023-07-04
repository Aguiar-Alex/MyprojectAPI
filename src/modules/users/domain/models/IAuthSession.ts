import User from '@modules/users/infra/typeorm/entities/User';

export interface IAuthSession {
  user: User;
  token: string;
}
