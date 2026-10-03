import morgan from 'morgan';
import { httpLoggerStream } from '../config/logger.js';

// Format HTTP log line for morgan
export const httpLoggerMiddleware = morgan(
  ':remote-addr - :method :url HTTP/:http-version :status :res[content-length] - :response-time ms',
  { stream: httpLoggerStream }
);
