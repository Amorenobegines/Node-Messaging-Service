import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { UserController } from "./user.controller";

const router = Router();

// Definir las rutas
router.get("/", authMiddleware, UserController.getAllUsers);
router.get("/:id", authMiddleware, UserController.getUserById);
router.patch("/:id/status", authMiddleware, UserController.changeStatus);
router.delete("/:id", authMiddleware, UserController.deleteUser);
router.patch("/:id", authMiddleware, UserController.updateUser);

export default router;
