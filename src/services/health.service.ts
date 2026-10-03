import { connectionManager } from '../database/connectionManager.js';
import { HealthApiResponse } from '../types/index.js';

export class HealthService {
  public async getHealthStatus(): Promise<HealthApiResponse> {
    const dbHealth = await connectionManager.checkHealth();
    
    return {
      status: dbHealth.isConnected ? 'healthy' : 'unhealthy',
      database: dbHealth.isConnected ? 'connected' : 'disconnected'
    };
  }
}

export const healthService = new HealthService();
