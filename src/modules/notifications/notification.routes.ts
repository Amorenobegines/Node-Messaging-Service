import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import { NotificationController } from '../notifications/notification.controller';

const router = Router();

// Definir las rutas

router.get("/:id", authMiddleware, NotificationController.getNotificationID);
router.get("/", authMiddleware, NotificationController.getUserNotifications);
router.delete("/:id", authMiddleware, NotificationController.deleteNotification);
router.patch("/:id/read", authMiddleware, NotificationController.MarkAsLeido);
export default router;