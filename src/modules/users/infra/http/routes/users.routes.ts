import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";

const usersRouter = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

// usersRouter.get("/", async (request, response) => {

//   const users = await getRepository(User).find();

//   return response.json(users);
// });

usersRouter.post("/", usersController.create);

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

export default usersRouter;
