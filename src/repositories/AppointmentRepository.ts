import { EntityRepository, getRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {

  public async findByDate(date: Date): Promise<Appointment | null> {
    const appointment = await getRepository(Appointment).findOne({
      where: { date }
    });

    return appointment || null;
  }
}

export default AppointmentRepository;