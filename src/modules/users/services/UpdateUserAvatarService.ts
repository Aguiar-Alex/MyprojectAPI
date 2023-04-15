import AppError from '@shared/http/errors/AppErrors';
import { PostgresDataSource } from '@shared/http/typeorm/AppDataSource';
import User from '../typeorm/entities/User';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
  id: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  public async execute({ id, avatarFileName }: IRequest): Promise<User> {
    const userRepository = PostgresDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new AppError('User not found !');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;

    await userRepository.save(user);

    return user;
  }
}
