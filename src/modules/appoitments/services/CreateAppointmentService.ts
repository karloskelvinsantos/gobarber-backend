import { getCustomRepository, getRepository } from "typeorm";
import { startOfHour } from "date-fns";
import AppError from "@shared/erros/AppError";

import Appointment from "@modules/appoitments/infra/typeorm/entities/Appointment";
import User from "@modules/users/infra/typeorm/entities/User";
import AppointmentRepository from "@modules/appoitments/repositories/AppointmentRepository";

interface RequestDTO {
  providerId: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ providerId, date }: RequestDTO): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const parsedDate = startOfHour(date);

    const existAppointmentInDate = await appointmentRepository.findByDate(
      parsedDate
    );

    if (existAppointmentInDate) {
      throw new AppError("This appointment already in use!");
    }

    const provider = await getRepository(User).findOne({
      where: { id: providerId },
    });

    const appointment = appointmentRepository.create({
      provider,
      date: parsedDate,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
