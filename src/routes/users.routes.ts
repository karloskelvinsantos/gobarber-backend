import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import { getRepository } from 'typeorm';


import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import User from '../models/User';
import CreateUserService from '../services/CreateUserService';
import UpdateAvatarUserService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload =  multer(uploadConfig);

const createUserService = new CreateUserService();

usersRouter.get('/', async (request, response) => {
  const users = await getRepository(User).find();

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const user = await createUserService.execute({ name, email, password });

    return response.json(user);

  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  try {
    const updateAvatarUser = new UpdateAvatarUserService();

    const user = await updateAvatarUser.execute({ user_id: request.user.id, avatarFilename: request.file.filename });

     return response.json(user);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

export default usersRouter;