import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';


const appointmentsRouter = Router();

const createAppointmentService = new CreateAppointmentService();

appointmentsRouter.get('/', async (request, response) => {
   const appointmentRepository = getCustomRepository(AppointmentRepository);
   return response.json(await appointmentRepository.find());
})

appointmentsRouter.post('/', async (request, response) => {
   try {
      const { providerId, date } = request.body;

      const parsedDate = parseISO(date);

      const appointment = await createAppointmentService.execute({
        providerId,
        date: parsedDate,
      })

      return response.json(appointment);
   } catch (error) {
      return response.status(400).json({ message: error.message });
   }
});

export default appointmentsRouter;