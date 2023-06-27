import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';

export interface IUserRepository {
  findByID(id: string): Promise<IUser | null>;
  findByName(name: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(data: ICreateUser): Promise<IUser>;
  save(user: ICreateUser): Promise<IUser>;
  remove(user: ICreateUser): Promise<void>;
}
