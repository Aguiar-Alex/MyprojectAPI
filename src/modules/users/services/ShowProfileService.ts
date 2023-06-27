import AppError from '@shared/infra/http/errors/AppErrors';
import { IShowProfile } from '../domain/models/IShowProfile';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUser } from '../domain/models/IUser';

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: IShowProfile): Promise<IUser> {
    const user = await this.userRepository.findByID(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}
