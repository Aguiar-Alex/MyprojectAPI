import AppError from '@shared/http/errors/AppErrors';
import { PostgresDataSource } from '@shared/http/typeorm/AppDataSource';
import User from '../typeorm/entities/User';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';

interface IRequest {
  id: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  public async execute({ id, avatarFileName }: IRequest): Promise<User> {
    const userRepository = PostgresDataSource.getRepository(User);
    const storageProvider = new DiskStorageProvider();

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new AppError('User not found !');
    }

    if (user.avatar) {
      await storageProvider.deleteFile(user.avatar);
    }

    const filename = await storageProvider.saveFile(avatarFileName);

    user.avatar = filename;

    await userRepository.save(user);

    return user;
  }
}
