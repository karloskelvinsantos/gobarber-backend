import { getRepository, Repository } from "typeorm";

import IAppointmentsRepository from "@modules/appoitments/repositories/IAppointmentsRepository";

import Appointment from "../entities/Appointment";
import ICreateAppointmentDTO from "@modules/appoitments/dtos/ICreateAppointmentDTO";

class AppointmentRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  find(): Promise<Appointment[]> {
    return this.ormRepository.find();
  }

  public async create({
    provider,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({
      where: { date },
    });

    return appointment;
  }
}

export default AppointmentRepository;
