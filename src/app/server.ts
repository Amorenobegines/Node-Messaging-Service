import express, { Application } from "express";
import cors from "cors";
import "../events/message.events";

// Middlewares globales
import { errorHandler } from "../middleware/error.middleware";

// Rutas
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/users/user.routes";
import messageRoutes from "../modules/messages/message.routes";
import { apiKeyMiddleware } from "../middleware/apiKey.middleware";
import notificationRouter from "../modules/notifications/notification.routes";



export class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        this.errorHandling();
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());

        //  Manejo de JSON inválido
        this.app.use((err: any, req: any, res: any, next: any) => {
            if (err instanceof SyntaxError && "body" in err) {
                return res.status(400).json({ error: "JSON inválido" });
            }
            next(err);
        });
    }

    private routes() {
        this.app.use("/auth", apiKeyMiddleware, authRoutes);
        this.app.use("/user", userRoutes);
        this.app.use("/messages", messageRoutes);
        this.app.use("/notification", notificationRouter);
        // Health check
        this.app.get("/health", (req, res) => {
            res.status(200).json({ status: "ok" });
        });
    }

    private errorHandling() {
        // IMPORTANTE: siempre al final
        this.app.use(errorHandler);
    }
}
