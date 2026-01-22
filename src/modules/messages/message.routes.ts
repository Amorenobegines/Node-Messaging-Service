import { Router } from "express";
import { MessageController } from "./message.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

/*
Ruta POST, GET, PATCH creada
Protegida con JWT
Llama al controlador correcto
 */

// Definir las rutas
router.post("/", authMiddleware, MessageController.sendMessage);
router.get("/", authMiddleware, MessageController.getMessages);
router.get("/:id", authMiddleware, MessageController.getMessageById);
router.patch("/:id/read", authMiddleware, MessageController.markAsRead);
router.delete("/:id", authMiddleware, MessageController.deleteMessage);


export default router;
