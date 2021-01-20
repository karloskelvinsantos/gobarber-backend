import { inject, injectable } from "tsyringe";

import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

import Appointment from "../infra/typeorm/entities/Appointment";

@injectable()
class CreateAppointmentService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async listAll(): Promise<Appointment[]> {
    return await this.appointmentsRepository.find();
  }
}

export default CreateAppointmentService;
