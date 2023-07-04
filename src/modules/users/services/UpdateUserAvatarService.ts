import AppError from '@shared/infra/http/errors/AppErrors';
import uploadConfig from '@config/upload';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider ';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';
import { IUser } from '../domain/models/IUser';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    id,
    avatarFileName,
  }: IUpdateUserAvatar): Promise<IUser> {
    const user = await this.userRepository.findByID(id);

    if (!user) {
      throw new AppError('User not found !');
    }

    if (uploadConfig.driver === 's3') {
      const s3Provider = new S3StorageProvider();
      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }

      const filename = await s3Provider.saveFile(avatarFileName);
      user.avatar = filename;
    } else {
      const diskProvider = new DiskStorageProvider();
      if (user.avatar) {
        await diskProvider.deleteFile(user.avatar);
      }

      const filename = await diskProvider.saveFile(avatarFileName);
      user.avatar = filename;
    }

    await this.userRepository.save(user);

    return user;
  }
}
