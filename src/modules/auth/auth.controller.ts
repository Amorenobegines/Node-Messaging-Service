import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { CustomError } from "../../domain/errors/custom.error";
import { log } from "node:console";

const authService = new AuthService();

//     Controllers → manejan HTTP

export class AuthController {

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, name } = req.body;

            if (!email || !password || !name) {
                throw CustomError.badRequest("email, password y name son obligatorios");
            }

            const result = await authService.register(email, password, name);

            res.status(201).json(result);

        } catch (error) {
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw CustomError.badRequest("email y password son obligatorios");
            }

            const result = await authService.login(email, password);

            res.json(result);

        } catch (error) {
            console.log(`${error}`);
            next(error);
        }
    }
}
