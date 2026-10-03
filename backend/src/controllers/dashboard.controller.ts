import { Request, Response, NextFunction } from 'express';
import { dashboardService } from '../services/dashboard.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class DashboardController {
  /**
   * GET /api/dashboard/test
   * Controller -> Service -> Repository -> SQL Server
   */
  public getTestMetrics = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await dashboardService.getTestDashboardMetrics();
      ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  };
}

export const dashboardController = new DashboardController();
