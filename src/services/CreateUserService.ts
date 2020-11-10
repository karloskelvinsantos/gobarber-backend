import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';


import User from '../models/User';

interface RequestDTO {
  name: string,
  email: string,
  password: string,
}

interface UserDTO {
  id: string,
  name: string
  email: string,
  created_at: Date,
  updated_at: Date
}

class CreateUserService {

  public async execute({ name, email, password }: RequestDTO): Promise<UserDTO> {
    const userRepository = getRepository(User);

    const isExistUserWithEmail = await userRepository.findOne({
      where: { email }
    });

    if (isExistUserWithEmail) {
      throw Error('This e-mail already in use!');
    }

    const hashedPassword = (await hash(password, 8)).toString();

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await userRepository.save(user);

    const userResponse: UserDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt,
      updated_at: user.updatedAt
    };

    return userResponse;
  }

}

export default CreateUserService;