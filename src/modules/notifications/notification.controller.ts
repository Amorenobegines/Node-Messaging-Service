
import { Request, Response, NextFunction } from 'express';
import { NotificationService } from './notification.service';
import { CustomError } from '../../domain/errors/custom.error';


const notificationService = new NotificationService();

export class NotificationController {

    static async getNotificationID(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            const notificationId = req.params?.id;

            if (!userId) {
                throw CustomError.unauthorized("Usuario no autenticado");
            }

            if (!notificationId) {
                throw CustomError.notFound("Notificación no encontrada");
            }

            const respuesta = await notificationService.getNotificationID(notificationId, userId);
            return res.json(respuesta);

        } catch (error) {
            next(error);
        }

    }

    static async getUserNotifications(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id;
            const notification = await notificationService.getUserNotifications(userId);
            return res.json(notification);
        } catch (error) {
            next(error);
        }
    }

    static async deleteNotification(req: Request, res: Response, next: NextFunction) {

        try {
            const userId = req.user?.id;

            const notificationId = req.params?.id;

            if (!userId) {
                throw CustomError.unauthorized("No tienes permiso para eliminar esta notificación");
            }

            if (!notificationId) {
                throw CustomError.badRequest("El id de la notificación es obligatorio");
            }
            const respuesta = await notificationService.deleteNotification(notificationId, userId);
            return res.json(respuesta);
        } catch (error) {
            next(error);
        }

    }

    static async MarkAsLeido(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            const notificationId = req.params?.id;

            if (!userId) {
                throw CustomError.unauthorized("No tienes permiso para modificar la notificación");
            }

            if (!notificationId) {
                throw CustomError.badRequest("El id de la notificación es obligatorio");
            }

            const result = await notificationService.markAsRead(notificationId, userId);
            return res.json(result);

        } catch (error) {
            next(error);
        }
    }


}