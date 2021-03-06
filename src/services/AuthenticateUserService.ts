import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken'

import authConfig from '../config/auth';

import User from '../models/User';

interface RequestDTO {
  email: string,
  password: string,
}

interface Response {
  user: User,
  token: string
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email }
    });

    if (!user) {
      throw Error('This email/password is incorret!');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw Error('This email/password is incorret!');
    }

    const { jwt } = authConfig;

    const token = sign({}, jwt.secret, {
      subject: user.id,
      expiresIn: jwt.expiresIn,
    });
    
    
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;