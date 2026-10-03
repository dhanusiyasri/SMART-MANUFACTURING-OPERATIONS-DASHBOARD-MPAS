import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.config.js';
import { env } from '../config/env.config.js';
import { AppError } from '../utils/appError.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const globalErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';
  const details = err instanceof AppError ? err.details : undefined;

  logger.error(`[${req.method} ${req.url}] HTTP ${statusCode} - ${message}`, {
    stack: err.stack,
    ip: req.ip
  });

  const errorCode = statusCode === 404 ? 'NOT_FOUND' : statusCode === 400 ? 'BAD_REQUEST' : 'INTERNAL_SERVER_ERROR';

  ApiResponse.error(
    res,
    message,
    statusCode,
    errorCode,
    env.NODE_ENV === 'development' ? { stack: err.stack, details } : details
  );
};
