import express from 'express';
import cors from 'cors';
import { envs } from './config/envs';
import { AppDataSource } from './database/data-source';
import { errorHandler } from './middleware/error.middleware'
// Rutas
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/user.routes';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use(authRoutes);
app.use(userRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

//IMPORTANTE: Middleware de errores SIEMPRE al final de las rutas 
app.use(errorHandler);

// Inicializar servidor + base de datos
AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');

        app.listen(envs.PORT, () => {
            console.log(`Server running on port ${envs.PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });

export default app;
