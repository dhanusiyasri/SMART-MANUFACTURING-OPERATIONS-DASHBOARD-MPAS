import { Request, Response, NextFunction } from 'express';
import { configService, ConfigService } from '../services/config.service.js';
import { logger } from '../../config/logger.config.js';

export class ConfigController {
  private service: ConfigService;

  constructor(service: ConfigService = configService) {
    this.service = service;
  }

  /**
   * @openapi
   * /api/config/dashboard:
   *   get:
   *     tags:
   *       - Config
   *     summary: Get dashboard plant configuration and production lines
   */
  public getDashboardConfig = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info('HTTP GET /api/config/dashboard requested');
      const response = await this.service.getDashboardConfig();
      res.status(200).json({
        success: true,
        data: response
      });
    } catch (error) {
      logger.error('ConfigController.getDashboardConfig HTTP error', error);
      next(error);
    }
  };
}

export const configController = new ConfigController();
