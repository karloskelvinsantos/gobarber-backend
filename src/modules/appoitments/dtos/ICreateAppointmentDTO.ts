import User from "@modules/users/infra/typeorm/entities/User";

interface ICreateAppointmentDTO {
  provider: User | undefined;
  date: Date;
}

export default ICreateAppointmentDTO;
