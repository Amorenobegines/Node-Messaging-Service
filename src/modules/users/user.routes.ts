import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import { AppDataSource } from '../../database/data-source';
import { User } from '../users/entities/User';
import { UserService } from './user.service';


const router = Router();
const userRepository = AppDataSource.getRepository(User);
const userService = new UserService();


// GET /users
router.get('/users', authMiddleware, async (req, res, next) => {
    console.log("Entrando en GET /users");
    try {

        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

// GET /users/id
router.get('/users/:id', authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;

        if (req.user?.id !== id) {
            return res.status(403).json({ error: 'No puedes ver los datos de otro usuario' });
        }

        const user = await userService.getUserById(id);
        res.json(user);

    } catch (error) {
        next(error);
    }
});



// PATCH /users/status
router.patch('/status', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.user!.id;
        const { isActive } = req.body;

        const user = await userService.changeStatus(userId, isActive);

        res.json(user);

    } catch (error) {
        next(error);
    }
});

router.delete('/users', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.user!.id;   // El usuario autenticado

        await userService.deleteUser(userId);

        res.json({ message: 'User deleted' });
    } catch (error) {
        next(error);
    }
});

router.patch('/users', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.user!.id;   // Usuario autenticado
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
});


export default router; // SIEMPRE al final
