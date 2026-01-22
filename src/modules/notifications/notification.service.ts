import { CustomError } from "../../domain/errors/custom.error";
import { UserRepository } from "../users/user.repository";
import { NotificationRepository } from "./notification.repository";



export class NotificationService {

    async createNotification(
        senderId: string,
        receiverId: string,
        type: string,
        content: string,
        messageId: string
    ) {
        const receiver = await UserRepository.findOne({ where: { id: receiverId } });

        if (!receiver) {
            throw CustomError.notFound("El receptor (${receiver.name}) no existe");
        }

        if (!receiver.isActive) {
            throw CustomError.badRequest(`El receptor (${receiver.name}) no está activo`);
        }

        const notification = NotificationRepository.create({
            senderId,
            receiverId,
            type,
            content,
            isLeido: false,
            messageId
        });

        return await NotificationRepository.save(notification);
    }



    async getUserNotifications(userId: string) {

        const notification = await NotificationRepository.find({
            where: { receiverId: userId },
            order: {
                createdAt: "DESC"
            }
        });

        return notification;
    }

    async getNotificationID(notificationId: string, receiverId: string) {
        const notification = await NotificationRepository.findOne({
            where: {
                id: notificationId
                //  receiverId: receiverId
            }

        });


        if (!notification) {
            throw CustomError.notFound("La notificación no existe");
        }

        if (notification.receiverId !== receiverId) {
            throw CustomError.unauthorized("No tienes permiso para ver esta notificación");
        }
        return notification;
    }


    async deleteNotification(notificatonId: string, receiverId: string) {

        const result = await NotificationRepository.delete({
            id: notificatonId,
            receiverId: receiverId
        });

        if (result.affected === 0) {
            throw CustomError.notFound('No existe la notificación o no pertenece al usuario');
        }

        return { message: "Notificación eliminada" };
    }

    async markAsRead(notificationId: string, userId: string) {

        const notification = await NotificationRepository.findOne({
            where: { id: notificationId },
        });

        if (!notification) {
            throw CustomError.notFound("La notificación no existe");
        }

        if (notification.receiverId !== userId) {
            throw CustomError.unauthorized("No tienes permiso para marcar esta notificación como leída");
        }

        if (notification.isLeido) {
            return notification;
        }

        await NotificationRepository.update(notificationId, { isLeido: true });

        return {
            ...notification,
            isLeido: true
        };
    }


}