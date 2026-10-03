import { Request, Response, NextFunction } from 'express';
import { healthService } from '../services/health.service.js';

export class HealthController {
  public checkHealth = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const health = await healthService.getHealthStatus();
      res.status(health.status === 'healthy' ? 200 : 503).json(health);
    } catch (error) {
      next(error);
    }
  };
}

export const healthController = new HealthController();
