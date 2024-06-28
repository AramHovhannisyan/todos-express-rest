import express from 'express';
import helmet from "helmet";
import logger from 'morgan';
import cors from 'cors';
import path from 'path';
import cookieParser from "cookie-parser";
import sequelize from './lib/models';
import AppError from './lib/errorHandling/AppError';
import globalErrorHandler from "./lib/errorHandling/globalErrorHandler";
import config from "./lib/config/config";
import taskRouter from './routes/taskRouter';
import userRouter from './routes/userRouter';
import authRouter from './routes/authRouter';

// Swagger
import swaggerUi from 'swagger-ui-express';
import specs from './lib/config/swagger';
// import { initializeDatabase } from './lib/utils/dbUtils';

const app = express();

// Middlewares

//  CORS
app.use(cors({
  "origin": "*",
  "methods": "GET,POST,PUT,PATCH,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));

// Security http headers
app.use(helmet());

if(config.server.env === 'dev'){
  app.use(logger('dev'));
}

// Body Parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));
app.use(cookieParser());
app.use(express.urlencoded({extended: true, limit: '10kb'}));

app.use('/public', express.static(path.join(process.cwd(), 'public')));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * Routes
 * Mounting Routes
 */
app.get('/health', (req, res) => res.sendStatus(200));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/task', taskRouter);

/**
 * Handling Errors
 */

app.use((req, res, next) => next(
  new AppError(`Cant find ${req.originalUrl} on this server`, 404)
));

app.use(globalErrorHandler);

const port = config.server.port;

async function start() {
  // await initializeDatabase();

  sequelize.sync()
  .then(() => {
    app.listen(port, () => {
        console.info(`Server is running on port ${port}`);
    });
  })
  .catch((e) => console.error('\n\nError establishing a connection to the database', e));
}

start();


