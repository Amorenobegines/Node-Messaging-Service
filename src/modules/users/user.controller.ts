import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { CustomError } from "../../domain/errors/custom.error";

const userService = new UserService();

export class UserController {

    static async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    static async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            if (req.user?.id !== id) {
                return res.status(403).json({ error: "No puedes ver los datos de otro usuario" });
            }

            const user = await userService.getUserById(id);
            res.json(user);

        } catch (error) {
            next(error);
        }
    }

    static async changeStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const { isActive } = req.body;

            const user = await userService.changeStatus(userId, isActive);
            res.json(user);

        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {

            const userId = req.user!.id;

            // Obtener el usuario antes de borrarlo 
            // const user = await userService.getUserById(userId);

            const deletedUser = await userService.deleteUser(userId);

            res.json({ message: `Usuario ${deletedUser.name} eliminado` });

        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const { name, password, isActive } = req.body;

            const updatedUser = await userService.updateUser(userId, {
                name,
                password,
                isActive
            });

            res.json(updatedUser);

        } catch (error) {
            next(error);
        }
    }
}
