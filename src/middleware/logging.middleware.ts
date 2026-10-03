import morgan from 'morgan';
import { httpStream } from '../config/logger.config.js';

export const requestLogger = morgan(
  ':remote-addr - :method :url HTTP/:http-version :status :res[content-length] - :response-time ms',
  { stream: httpStream }
);
