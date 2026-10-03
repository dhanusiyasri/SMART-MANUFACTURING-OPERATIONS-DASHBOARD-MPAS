import http from 'http';
import { createApp } from './app.js';
import { env } from './config/env.config.js';
import { logger } from './config/logger.config.js';
import { connectionManager } from './database/connectionManager.js';
import { socketServer } from './socket/socketServer.js';

const startServer = async (): Promise<void> => {
  try {
    const app = createApp();
    const server = http.createServer(app);

    // Initialize prepared socket server wrapper
    socketServer.initialize(server);

    // Warm up MSSQL connection pool on server boot
    try {
      await connectionManager.getPool();
    } catch (dbErr) {
      const err = dbErr as Error;
      logger.warn(`⚠️ Application starting with delayed database pool connection: ${err.message}`);
    }

    server.listen(env.PORT, () => {
      logger.info(`===========================================================`);
      logger.info(`🚀 Smart Manufacturing Dashboard API running on port ${env.PORT}`);
      logger.info(`⚙️  Environment: ${env.NODE_ENV}`);
      logger.info(`🗄️  SQL Server: ${env.DB_SERVER} | Database: ${env.DB_DATABASE}`);
      logger.info(`🏥 Health Check API: GET http://localhost:${env.PORT}/api/health`);
      logger.info(`📊 Test Metrics API: GET http://localhost:${env.PORT}/api/dashboard/test`);
      logger.info(`===========================================================`);
    });

    // Graceful Shutdown Teardown Logic
    const gracefulShutdown = async (signal: string): Promise<void> => {
      logger.info(`Received ${signal}. Initiating graceful shutdown...`);

      server.close(async (err) => {
        if (err) {
          logger.error(`Error closing HTTP server: ${err.message}`);
        } else {
          logger.info('HTTP server closed.');
        }

        // Close SQL Connection Pool cleanly
        await connectionManager.closePool();

        logger.info('Graceful shutdown completed successfully. Process exiting.');
        process.exit(0);
      });

      setTimeout(() => {
        logger.error('Forceful shutdown executed due to timeout.');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => {
      void gracefulShutdown('SIGTERM');
    });

    process.on('SIGINT', () => {
      void gracefulShutdown('SIGINT');
    });

    process.on('unhandledRejection', (reason: unknown) => {
      logger.error('Unhandled Promise Rejection caught:', reason);
    });

    process.on('uncaughtException', (err: Error) => {
      logger.error('Uncaught Exception thrown:', err);
      void gracefulShutdown('UNCAUGHT_EXCEPTION');
    });
  } catch (error) {
    const err = error as Error;
    logger.error(`Fatal application start error: ${err.message}`);
    process.exit(1);
  }
};

void startServer();
