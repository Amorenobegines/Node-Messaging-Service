/*
import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User, Message } from '../modules';


const DB_HOST: string = process.env.DB_HOST ?? 'localhost';
const DB_PORT: number = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432;
const DB_USER: string = process.env.DB_USER ?? 'postgres';
const DB_PASSWORD: string = process.env.DB_PASSWORD ?? 'postgres';
const DB_NAME: string = process.env.DB_NAME ?? 'mensajeria';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User],
});*/

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { envs } from '../config/envs';
import { User, Message } from '../modules';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Message],
});

