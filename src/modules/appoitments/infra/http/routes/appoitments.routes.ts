import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppointmentRepository from "@modules/appoitments/repositories/AppointmentRepository";
import CreateAppointmentService from "@modules/appoitments/services/CreateAppointmentService";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

const createAppointmentService = new CreateAppointmentService();

appointmentsRouter.get("/", async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  return response.json(await appointmentRepository.find());
});

appointmentsRouter.post("/", async (request, response) => {
  const { providerId, date } = request.body;

  const parsedDate = parseISO(date);

  const appointment = await createAppointmentService.execute({
    providerId,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
