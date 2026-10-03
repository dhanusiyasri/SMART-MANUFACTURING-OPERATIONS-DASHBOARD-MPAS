import { axiosClient } from '../api/axiosClient.js';
import { ApiResponseWrapper } from './dashboard.service.js';

export interface IProductionLineStatus {
  lineId: string;
  lineName: string;
  targetPerHour: number;
  actualProduction: number;
  efficiencyPercentage: number;
  status: 'RUNNING' | 'WARNING' | 'STOPPED';
}

export class ProductionService {
  /**
   * Fetches assembly line production statistics
   */
  public async getLineStatus(lineId?: string): Promise<ApiResponseWrapper<IProductionLineStatus[]>> {
    return await axiosClient.get<unknown, ApiResponseWrapper<IProductionLineStatus[]>>('/production/lines', {
      params: { lineId }
    });
  }
}

export const productionService = new ProductionService();
