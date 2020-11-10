import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

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

export default usersRouter;