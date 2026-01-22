import { AppDataSource } from "../../database/data-source";
import { Notifications } from "./entities/Notifications";

export const NotificationRepository = AppDataSource.getRepository(Notifications);