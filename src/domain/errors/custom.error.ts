export class CustomError extends Error {
    public readonly statusCode: number;
    public readonly errors?: any[];


    constructor(message: string, statusCode: number = 400, errors?: any[]) {
        super(message);
        this.statusCode = statusCode;
        if (errors) {
            this.errors = errors;
        }
    }

    static badRequest(message: string, errors?: any[]) {
        return new CustomError(message, 400, errors);
    }

    static unauthorized(message: string) {
        return new CustomError(message, 401);
    }

    static forbidden(message: string) {
        return new CustomError(message, 403);
    }

    static notFound(message: string) {
        return new CustomError(message, 404);
    }

    static conflict(message: string) {
        return new CustomError(message, 409);
    }

    static validation(message: string, errors: any[]) {
        return new CustomError(message, 422, errors);
    }
}
