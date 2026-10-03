import { connectionManager } from '../database/connectionManager.js';
import { ISAPSequencePlanQueryResult, ITotalOrdersData } from '../interfaces/dashboard.interface.js';
import { logger } from '../config/logger.config.js';
import { AppError } from '../utils/appError.js';

export class DashboardRepository {
  private readonly tableName = 'SAP_ZPP_SEQ_PLAN';

  /**
   * Executes SELECT COUNT(*) AS TotalOrders FROM SAP_ZPP_SEQ_PLAN
   */
  public async getTotalOrdersCount(): Promise<ITotalOrdersData> {
    try {
      const pool = await connectionManager.getPool();
      const query = `SELECT COUNT(*) AS TotalOrders FROM ${this.tableName}`;

      logger.debug(`Executing query in DashboardRepository: ${query}`);
      const result = await pool.request().query<ISAPSequencePlanQueryResult>(query);

      const record = result.recordset[0];
      const totalOrders = record !== undefined ? record.TotalOrders : 0;

      return {
        totalOrders
      };
    } catch (error) {
      const err = error as Error;
      logger.error(`Database query failed in DashboardRepository.getTotalOrdersCount: ${err.message}`);
      throw new AppError(`Failed to fetch total orders count: ${err.message}`, 500, true);
    }
  }
}

export const dashboardRepository = new DashboardRepository();
