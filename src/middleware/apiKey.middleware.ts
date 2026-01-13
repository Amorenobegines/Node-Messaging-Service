import { Request, Response, NextFunction } from 'express';
import { envs } from '../config/envs';

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.header('x-api-key');

    if (!apiKey || apiKey !== envs.API_KEY) {
        return res.status(401).json({ error: 'Invalid or missing API Key' });
    }

    next();
};
