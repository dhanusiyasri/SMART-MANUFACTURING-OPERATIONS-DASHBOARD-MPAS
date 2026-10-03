import { dashboardRepository } from '../repositories/dashboard.repository.js';
import { ITotalOrdersData } from '../interfaces/dashboard.interface.js';
import { socketServer } from '../socket/socketServer.js';

export class DashboardService {
  /**
   * Fetches total orders metric and optionally emits real-time event hook
   */
  public async getTestDashboardMetrics(): Promise<ITotalOrdersData> {
    const data = await dashboardRepository.getTotalOrdersCount();

    // Hook prepared for Socket.IO real-time broadcast without altering REST API
    socketServer.broadcast('dashboard:orders_update', data);

    return data;
  }
}

export const dashboardService = new DashboardService();
