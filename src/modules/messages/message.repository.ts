import { AppDataSource } from '../../database/data-source';
import { Message } from './entities/Message';


export const MessageRepository = AppDataSource.getRepository(Message);



/*
Usa el repositorio de TypeORM
Importa correctamente la entidad
 */