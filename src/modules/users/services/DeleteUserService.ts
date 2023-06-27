import AppError from '@shared/infra/http/errors/AppErrors';
import { IDeleteUser } from '../domain/models/IDeleteUser';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute({ id }: IDeleteUser): Promise<void> {
    const user = await this.userRepository.findByID(id);

    if (!user) {
      throw new AppError('User not found !');
    }

    await this.userRepository.remove(user);
  }
}
