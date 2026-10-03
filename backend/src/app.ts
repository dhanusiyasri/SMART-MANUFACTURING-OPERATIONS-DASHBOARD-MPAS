import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.config.js';
import { requestLogger } from './middleware/logging.middleware.js';
import { apiRouter } from './routes/index.js';
import { configRouter } from './config/routes/config.routes.js';
import { notFoundHandler } from './middleware/notFound.middleware.js';
import { globalErrorHandler } from './middleware/error.middleware.js';

export const createApp = (): Application => {
  const app: Application = express();

  // Security Middlewares
  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true
    })
  );

  // Request Parsers & HTTP Logging Middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(requestLogger);

  // Mount API Endpoints
  app.use('/api/config', configRouter);
  app.use('/api', apiRouter);

  // 404 Not Found & Central Error Handler
  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  return app;
};
