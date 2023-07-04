import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';
import { IUserPaginate } from '../models/IUserPaginate';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IUserRepository {
  findByID(id: string): Promise<IUser | null>;
  findByName(name: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findAll({ page, skip, take }: SearchParams): Promise<IUserPaginate>;
  create(data: ICreateUser): Promise<IUser>;
  save(user: ICreateUser): Promise<IUser>;
  remove(user: ICreateUser): Promise<void>;
}
