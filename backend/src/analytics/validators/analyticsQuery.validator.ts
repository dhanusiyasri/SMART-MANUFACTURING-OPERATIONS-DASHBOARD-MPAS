import { Request, Response, NextFunction } from 'express';
import { AnalyticsFilterSchema, normalizeAnalyticsFilters, IAnalyticsFilterDTO } from '../dto/analyticsFilter.dto.js';
import { logger } from '../../config/logger.config.js';

export const validateAnalyticsQuery = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const rawParsed = AnalyticsFilterSchema.parse(req.query);
    const normalized: IAnalyticsFilterDTO = normalizeAnalyticsFilters(rawParsed);

    // Layer 10 Logging: Log Selected Filters
    logger.info(`🔍 [HTTP Analytics Request] Route: ${req.path} | Query Params: ${JSON.stringify(req.query)} | Normalized Filters: ${JSON.stringify(normalized)}`);

    req.query = normalized as unknown as Record<string, string>;
    next();
  } catch (error) {
    logger.error('❌ validateAnalyticsQuery validation failure', error);
    res.status(400).json({
      success: false,
      message: 'Invalid analytics query parameters',
      error: error
    });
  }
};
