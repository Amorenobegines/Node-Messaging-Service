
import { Router } from 'express';
import { UserService } from '../../modules/users/user.service';
import { AuthService } from './auth.service';
import { apiKeyMiddleware } from '../../middleware/apiKey.middleware';


/*
Errores claros
Registro con ApiKey y login funcionando
*/

const router = Router();

// POST /auth/register
router.post('/register', apiKeyMiddleware, async (req, res, next) => {
    try {
        const userService = new UserService();
        const result = await userService.register(req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
});


// POST /auth/login
router.post('/login', apiKeyMiddleware, async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const authService = new AuthService();
        const user = await authService.validateUser(email, password);

        const result = authService.login(user);

        res.json(result);

    } catch (error) {
        next(error);
    }
});


export default router;
