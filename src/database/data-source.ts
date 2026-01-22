

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { envs } from '../config/envs';
import { User, Message, Notifications } from '../modules';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Message, Notifications],
});

