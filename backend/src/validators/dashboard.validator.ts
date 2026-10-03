import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../utils/appError.js';

export const dashboardTestQuerySchema = z.object({
  filter: z.string().optional()
});

export const validateDashboardQuery = (req: Request, _res: Response, next: NextFunction): void => {
  const result = dashboardTestQuerySchema.safeParse(req.query);
  if (!result.success) {
    next(new AppError('Invalid query parameters', 400, true, result.error.format()));
    return;
  }
  next();
};
