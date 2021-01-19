import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { getRepository } from "typeorm";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

import User from "@modules/users/infra/typeorm/entities/User";
import CreateUserService from "@modules/users/services/CreateUserService";
import UpdateAvatarUserService from "@modules/users/services/UpdateUserAvatarService";

const usersRouter = Router();
const upload = multer(uploadConfig);

const createUserService = new CreateUserService();

usersRouter.get("/", async (request, response) => {
  const users = await getRepository(User).find();

  return response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;

  const user = await createUserService.execute({ name, email, password });

  return response.json(user);
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    const updateAvatarUser = new UpdateAvatarUserService();

    const user = await updateAvatarUser.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(user);
  }
);

export default usersRouter;
