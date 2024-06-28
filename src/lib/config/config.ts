import dotenv from 'dotenv';
import { fromEnv } from '../utils/configUtils';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const SERVER_PORT = fromEnv('SERVER_PORT');
const NODE_ENV = fromEnv('NODE_ENV');
const JWT_ACCESS_SECRET = fromEnv('JWT_ACCESS_SECRET');
const JWT_SECRET_EXPIRES = fromEnv('JWT_SECRET_EXPIRES');
const JWT_REFRESH_SECRET = fromEnv('JWT_REFRESH_SECRET');
const JWT_REFRESH_EXPIRES = fromEnv('JWT_REFRESH_EXPIRES');

const DB_HOST = fromEnv('DB_HOST');
const DB_USERNAME = fromEnv('DB_USERNAME');
const DB_PASSWORD = fromEnv('DB_PASSWORD');
const DB_NAME = fromEnv('DB_NAME');

const DB_ROOT_USERNAME = fromEnv('DB_ROOT_USERNAME');
const DB_ROOT_PASSWORD = fromEnv('DB_ROOT_PASSWORD');

const config = {
  jwt: {
    secret: JWT_ACCESS_SECRET,
    refresh: JWT_REFRESH_SECRET,
    expiresIn: JWT_SECRET_EXPIRES,
    refreshExpiresIn: JWT_REFRESH_EXPIRES,
  },
  server: {
    port: SERVER_PORT,
    env: NODE_ENV
  },
  db: {
    host: DB_HOST,
    user: DB_USERNAME,
    pass: DB_PASSWORD,
    name: DB_NAME,
    root: {
      user: DB_ROOT_USERNAME,
      pass: DB_ROOT_PASSWORD,
    }
  },
};

export default config;