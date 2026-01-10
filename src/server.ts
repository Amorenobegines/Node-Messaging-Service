import app from './app';
import 'dotenv/config';
import { AppDataSource } from './database/data-source';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log('📦 Base de datos conectada');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ Error al conectar la base de datos', error);
    });
