import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../domain/errors/custom.error';


export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            error: err.message
        });
    }

    // Errores no controlados
    return res.status(500).json({
        error: err.message || "Internal server error"
    });
};
