import { Request, Response, NextFunction } from "express";
import { MessageService } from "./message.service";
import { CustomError } from "../../domain/errors/custom.error";


//  Controller	Maneja HTTP, valida request, responde

const messageService = new MessageService();

export class MessageController {

    // enviar mensaje
    static async sendMessage(req: Request, res: Response, next: NextFunction) {
        try {
            // Obtiene el senderId desde el JWT
            const senderId = req.user.id; // viene del authMiddleware
            const { receiverId, content } = req.body;

            // Validación del body
            if (!receiverId || !content) {
                throw CustomError.badRequest("receiverId y content son obligatorios");
            }

            const message = await messageService.sendMessage(
                senderId,
                receiverId,
                content
            );

            // Llama al servicio y devuelve el mensaje
            return res.status(201).json(message);

        } catch (error) {
            next(error);
        }
    }

    // obtener todos los mensajes enviados y recibidos en dos arrys
    static async getMessages(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id;

            const message = await messageService.getMessages(userId);

            return res.json(message);

        } catch (error) {
            next(error);
        }
    }

    //  mensajería: ver un mensaje concreto
    static async getMessageById(req: Request, res: Response, next: NextFunction) {
        try {

            const userId = req.user?.id;
            const messageId = req.params?.id;

            if (!userId) { throw CustomError.unauthorized("Usuario no autenticado"); }
            if (!messageId) { throw CustomError.badRequest("El id del mensaje es obligatorio"); }

            const message = await messageService.getMessageById(
                messageId,
                userId
            );

            return res.json(message);

        } catch (error) {
            next(error);
        }
    }

    //  mensajería: marcar mensaje como leido
    static async markAsRead(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            const messageId = req.params?.id;

            if (!userId) {
                throw CustomError.unauthorized("Usuario no autenticado");
            }

            if (!messageId) {
                throw CustomError.badRequest("El id del mensaje es obligatorio");
            }

            const message = await messageService.markAsRead(messageId, userId);

            return res.json(message);

        } catch (error) {
            next(error);
        }
    }

    // Eliminar un mensaje concreto por el emisor
    static async deleteMessage(req: Request, res: Response, next: NextFunction) {

        try {
            const userId = req.user?.id;
            const messageId = req.params?.id;

            if (!userId) {
                throw CustomError.unauthorized("Usuario no autenticado");
            }

            if (!messageId) {
                throw CustomError.badRequest("El id del mensaje es obligatorio");
            }
            const message = await messageService.deleteMessage(messageId, userId);
            res.json(message);

        } catch (error) {
            next(error);
        }
    }
}
