import { MessageRepository } from "./message.repository";
import { UserRepository } from "../../modules/users/user.repository";
import { CustomError } from "../../domain/errors/custom.error";
import { appEventEmitter } from "../../events/eventEmitter";

//   Service	Lógica de negocio, reglas, acceso a repositorios

export class MessageService {

    async sendMessage(senderId: string, receiverId: string, content: string) {


        const receiver = await UserRepository.findOne({ where: { id: receiverId } });
        // Verifica que el receptor existe
        if (!receiver) {
            throw CustomError.notFound("El receptor no existe");
        }

        // Verifica que el receptor está activo
        if (!receiver.isActive) {
            throw CustomError.badRequest(`El receptor (${receiver.name}) no está activo`);
        }

        //  Crea el mensaje correctamente
        const message = MessageRepository.create({
            sender: { id: senderId },
            receiver: { id: receiverId },
            content
        });

        // Guarda el mensaje
        const savedMessage = await MessageRepository.save(message);

        // Emitir el evento con los datos del mensaje
        appEventEmitter.emit("messageSent", {
            senderId,
            receiverId,
            messageId: savedMessage.id
        });

        return savedMessage;
    }


    async getMessages(userId: string) {
        const messages = await MessageRepository.find({
            where: [
                { sender: { id: userId } }, // mensajes ENVIADOS por el usuario 
                { receiver: { id: userId } } // mensajes RECIBIDOS por el usuario
            ],
            withDeleted: true,
            relations: ["sender", "receiver"],
            select: {
                id: true,
                content: true,
                createdAt: true,
                isLeido: true,
                sender: {
                    id: true,
                    name: true,
                    email: true
                },
                receiver: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            order: {
                createdAt: "DESC"
            }
        });

        // Separar enviados y recibidos
        const sent = messages.filter(m => m.sender.id === userId);
        const received = messages.filter(m => m.receiver.id === userId);

        return { sent, received };
    }

    // verificar permisos y devolver mensaje
    async getMessageById(messageId: string, userId: string) {

        const message = await MessageRepository.findOne({
            where: { id: messageId },
            withDeleted: true,
            relations: ["sender", "receiver"],
            select: {
                id: true,
                content: true,
                createdAt: true,
                isLeido: true,
                sender: {
                    id: true,
                    name: true,
                    email: true
                },
                receiver: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        });

        if (!message) {
            throw CustomError.notFound("El mensaje no existe");
        }

        const isSender = message.sender.id === userId;
        const isReceiver = message.receiver.id === userId;

        if (!isSender && !isReceiver) {
            throw CustomError.unauthorized("No tienes permiso para ver este mensaje");
        }

        return message;
    }

    async markAsRead(messageId: string, userId: string) {

        const message = await MessageRepository.findOne({
            where: { id: messageId },
            withDeleted: true,
            relations: ["sender", "receiver"],
            select: {
                id: true,
                content: true,
                createdAt: true,
                isLeido: true,
                sender: {
                    id: true,
                    name: true,
                    email: true
                },
                receiver: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        });

        if (!message) {
            throw CustomError.notFound("El mensaje no existe");
        }

        // Verificar que el usuario es el receptor
        if (message.receiver.id !== userId) {
            throw CustomError.unauthorized("No tienes permiso para marcar este mensaje como leido");
        }

        // Si ya esta leido, devolverlo tal cual
        if (message.isLeido) {
            return message;
        }

        // Actualizar
        await MessageRepository.update(messageId, { isLeido: true });

        // Devolver mensaje actualizado
        return {
            ...message,
            isLeido: true
        };
    }

    async deleteMessage(messageId: string, senderId: string) {

        const result = await MessageRepository.delete({
            id: messageId,
            senderId: senderId
        });

        // Verificar que el usuario es el EMISOR usando la FK
        if (result.affected === 0) {
            throw CustomError.notFound('No existe el mensaje o no pertenece al emisor');
        }

        return { message: "Mensage eliminado" };
    }

}
