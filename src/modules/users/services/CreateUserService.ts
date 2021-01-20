import { hash } from "bcrypt";

import AppError from "@shared/erros/AppError";
import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    name,
    email,
    password,
  }: RequestDTO): Promise<User | undefined> {
    const isExistUserWithEmail = await this.usersRepository.findByEmail(email);

    if (isExistUserWithEmail) {
      throw new AppError("This e-mail already in use!");
    }

    const hashedPassword = (await hash(password, 8)).toString();

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
