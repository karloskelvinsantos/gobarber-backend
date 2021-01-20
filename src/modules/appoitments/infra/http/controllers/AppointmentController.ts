import { Request, Response } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";

import CreateAppointmentService from "@modules/appoitments/services/CreateAppointmentService";
import AppointmentService from "@modules/appoitments/services/AppointementService";

class AppointmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const appointments = await container.resolve(AppointmentService).listAll();
    return response.json(appointments);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { providerId, date } = request.body;

    const createAppointmentService = container.resolve(
      CreateAppointmentService
    );

    const parsedDate = parseISO(date);

    const appointment = await createAppointmentService.execute({
      providerId,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}

export default AppointmentController;
