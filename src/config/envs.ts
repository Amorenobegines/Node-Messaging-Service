import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    // Server
    PORT: get('PORT').required().asPortNumber(),

    // APIKEY
    API_KEY: get('API_KEY').required().asString(),


    // JWT
    JWT_SEED: get('JWT_SEED').required().asString(),


    // PostgreSQL
    DB_HOST: get('DB_HOST').default('localhost').asString(),
    DB_PORT: get('DB_PORT').default('5432').asPortNumber(),
    DB_USER: get('DB_USER').default('postgres').asString(),
    DB_PASSWORD: get('DB_PASSWORD').default('postgres').asString(),
    DB_NAME: get('DB_NAME').default('mensajeria').asString(),
};

