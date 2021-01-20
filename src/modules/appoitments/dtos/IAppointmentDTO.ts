import { de } from "date-fns/locale";

interface IAppointmentDTO {
  date: Date;
  provider: string;
  updatedAt: Date;
  createdAt: Date;
}

export default IAppointmentDTO;
