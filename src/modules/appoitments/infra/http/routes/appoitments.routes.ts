import { Router } from "express";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

import AppointmentController from "../controllers/AppointmentController";

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

const appointmentController = new AppointmentController();

appointmentsRouter.get("/", appointmentController.index);

appointmentsRouter.post("/", appointmentController.create);

export default appointmentsRouter;
