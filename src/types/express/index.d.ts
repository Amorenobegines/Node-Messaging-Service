import { User } from '../../modules/users/entities/User';



// Esto le dice a TypeScript que req.user sí existe  

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
                email: string;
                name?: string;
            };
        }
    }
}
