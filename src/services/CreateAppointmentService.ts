import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface RequestDTO {
    provider: string,
    date: Date,
}

class CreateAppointmentService {

    private appointmentRepository: AppointmentRepository;

    constructor(appointmentRepository: AppointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public execute({ provider, date }: RequestDTO): Appointment {

        const parsedDate = startOfHour(date);

        const existAppointmentInDate = this.appointmentRepository.findByDate(parsedDate);

        if (existAppointmentInDate) {
            throw Error('This appointment already in use!');
        }

        const appointment = this.appointmentRepository.create({
            provider,
            date: parsedDate,
         });

         return appointment;
    }

}

export default CreateAppointmentService;