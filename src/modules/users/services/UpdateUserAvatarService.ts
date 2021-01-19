import path from "path";
import fs from "fs";
import { getRepository } from "typeorm";

import uploadConfig from "@config/upload";
import AppError from "@shared/erros/AppError";

import User from "@modules/users/infra/typeorm/entities/User";

interface RequestDTO {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError("Only authenticated users can change avatar.");
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(
        uploadConfig.directoryImages,
        user.avatar
      );
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
