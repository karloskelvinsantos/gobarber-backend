import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface RequestDTO {
    provider: string,
    date: Date,
}

class CreateAppointmentService {   

    public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
        const appointmentRepository = getCustomRepository(AppointmentRepository);

        const parsedDate = startOfHour(date);

        const existAppointmentInDate = await appointmentRepository.findByDate(parsedDate);

        if (existAppointmentInDate) {
            throw Error('This appointment already in use!');
        }

        const appointment = appointmentRepository.create({
            provider,
            date: parsedDate,
         });

         await appointmentRepository.save(appointment);

         return appointment;
    }

}

export default CreateAppointmentService;