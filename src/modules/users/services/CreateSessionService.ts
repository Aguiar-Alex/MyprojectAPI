import AppError from '@shared/infra/http/errors/AppErrors';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { ICreateSession } from '../domain/models/ICreateSession';
import { IAuthSession } from '../domain/models/IAuthSession';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
export default class CreateSessionsService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSession): Promise<IAuthSession> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const paswordConfirmed = await compare(password, user.password);

    if (!paswordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
