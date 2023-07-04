import { IUserPaginate } from '../domain/models/IUserPaginate';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export default class ListUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ page, limit }: SearchParams): Promise<IUserPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * limit;
    const users = await this.userRepository.findAll({ page, skip, take });

    return users;
  }
}
