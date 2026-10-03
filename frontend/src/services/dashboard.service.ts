import { axiosClient } from '../api/axiosClient.js';
import { ITotalOrdersMetrics } from '../interfaces/dashboard.interface.js';

export interface ApiResponseWrapper<T> {
  success: boolean;
  message?: string;
  timestamp?: string;
  data: T;
}

export class DashboardService {
  /**
   * Fetches total order counts from SAP_ZPP_SEQ_PLAN via GET /api/dashboard/test
   */
  public async getTestMetrics(): Promise<ApiResponseWrapper<ITotalOrdersMetrics>> {
    return await axiosClient.get<unknown, ApiResponseWrapper<ITotalOrdersMetrics>>('/dashboard/test');
  }

  /**
   * Fetches backend health status via GET /api/health
   */
  public async getHealthStatus(): Promise<{ status: string; database: string }> {
    return await axiosClient.get<unknown, { status: string; database: string }>('/health');
  }
}

export const dashboardService = new DashboardService();
