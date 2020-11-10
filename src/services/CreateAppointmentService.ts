import { getCustomRepository, getRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import User from '../models/User';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface RequestDTO {
  providerId: string,
  date: Date,
}

class CreateAppointmentService {
  public async execute({ providerId, date }: RequestDTO): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const parsedDate = startOfHour(date);

    const existAppointmentInDate = await appointmentRepository.findByDate(parsedDate);

    if (existAppointmentInDate) {
      throw Error('This appointment already in use!');
    }

    const provider = await getRepository(User).findOne({ where: { id: providerId } });

    const appointment = appointmentRepository.create({
      provider,
      date: parsedDate,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }

}

export default CreateAppointmentService;