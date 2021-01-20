import { startOfHour } from "date-fns";
import { inject, injectable } from "tsyringe";

import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

import AppError from "@shared/erros/AppError";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

import IAppointmentDTO from "../dtos/IAppointmentDTO";

interface RequestDTO {
  providerId: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    providerId,
    date,
  }: RequestDTO): Promise<IAppointmentDTO> {
    const parsedDate = startOfHour(date);

    const existAppointmentInDate = await this.appointmentsRepository.findByDate(
      parsedDate
    );

    if (existAppointmentInDate) {
      throw new AppError("This appointment already in use!");
    }

    const provider = await this.usersRepository.findById(providerId);

    const appointment = await this.appointmentsRepository.create({
      provider,
      date: parsedDate,
    });

    return {
      date: appointment.date,
      provider: appointment.provider.name,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
    };
  }
}

export default CreateAppointmentService;
