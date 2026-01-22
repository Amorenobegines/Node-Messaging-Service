import { appEventEmitter } from "./eventEmitter";
import { NotificationService } from "../modules/notifications/notification.service";

const notificationService = new NotificationService();

// Creamos un listener que escucha ese evento
// nombre del envento: messageSent
appEventEmitter.on("messageSent", async ({ senderId, receiverId, messageId }) => {
    try {
        await notificationService.createNotification(
            senderId,
            receiverId,
            "Message",
            "Tienes un mensaje nuevo",
            messageId
        );
    } catch (error) {
        console.error("Error creando notificación:", error);
    }
});

