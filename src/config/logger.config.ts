import winston from 'winston';
import path from 'path';
import fs from 'fs';
import { env } from './env.config.js';

const logDir = path.resolve(process.cwd(), env.LOG_DIR);

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const customFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'smart-manufacturing-backend' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
      )
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log')
    })
  ]
});

export const httpStream = {
  write: (message: string): void => {
    logger.http(message.trim());
  }
};
