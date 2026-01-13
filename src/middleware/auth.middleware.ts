import { Request, Response, NextFunction } from 'express';
import { JwtAdapter } from '../config/jwt.adapter';

/*
Valida token
Añade req.user  
Devuelve 401 si falla 
*/


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ error: 'Missing token' });
    }

    const [type, token] = header.split(' ');

    // Si no pones “Bearer”, tu middleware rechaza el token.
    // El estándar HTTP define varios esquemas de autenticación:
    if (type !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Invalid token format' });
    }

    try {
        const payload = JwtAdapter.verifyToken(token) as any;

        req.user = {
            id: payload.id,
            email: payload.email,
            name: payload.name
        };

        next();

    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
