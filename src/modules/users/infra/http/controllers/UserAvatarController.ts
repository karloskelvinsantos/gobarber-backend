import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateAvatarUserService from "@modules/users/services/UpdateUserAvatarService";

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatarUser = container.resolve(UpdateAvatarUserService);

    const user = await updateAvatarUser.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(user);
  }
}

export default UserAvatarController;
