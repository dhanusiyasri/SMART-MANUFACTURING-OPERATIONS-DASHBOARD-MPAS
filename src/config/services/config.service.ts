import { connectionManager } from '../../database/connectionManager.js';
import { logger } from '../../config/logger.config.js';

export interface IPlantConfig {
  code: string;
  name: string;
  location?: string;
  isReadOnly?: boolean;
}

export interface IProductionLineConfig {
  code: string;
  name: string;
}

export interface IShiftConfig {
  code: string;
  name: string;
}

export interface IDateRangeConfig {
  code: string;
  name: string;
}

export interface IDashboardConfigResponse {
  plant: IPlantConfig;
  lines: string[];
  productionLines: IProductionLineConfig[];
  shifts: IShiftConfig[];
  dateRanges: IDateRangeConfig[];
}

export class ConfigService {
  /**
   * Returns plant configuration (Plant 2004) and available LineCode values directly from SQL Server.
   */
  public async getDashboardConfig(): Promise<IDashboardConfigResponse> {
    let plantCode = '2004';
    let lines: string[] = ['0101', '0201', '0203'];

    try {
      const pool = await connectionManager.getPool();

      // Query PlantCode directly from DB using real schema
      const plantRes = await pool.request().query<{ plantCode: string }>(`
        SELECT TOP 1 [PlantCode] AS plantCode
        FROM SAP_ZPP_SEQ_PLAN
        WHERE [PlantCode] IS NOT NULL AND [PlantCode] <> ''
      `);

      if (plantRes.recordset.length > 0 && plantRes.recordset[0]?.plantCode) {
        plantCode = plantRes.recordset[0].plantCode;
      }

      // Query LineCode directly from DB using real schema
      const lineRes = await pool.request().query<{ lineCode: string }>(`
        SELECT DISTINCT [LineCode] AS lineCode
        FROM SAP_ZPP_SEQ_PLAN
        WHERE [LineCode] IS NOT NULL AND [LineCode] <> ''
        ORDER BY [LineCode] ASC
      `);

      if (lineRes.recordset.length > 0) {
        lines = lineRes.recordset.map((r) => r.lineCode);
      }
    } catch (error) {
      logger.warn(`⚠️ ConfigService.getDashboardConfig DB query fallback: ${(error as Error).message}`);
    }

    const plant: IPlantConfig = {
      code: plantCode,
      name: 'Ashok Leyland Manufacturing Plant',
      location: 'Plant 2004',
      isReadOnly: true
    };

    const productionLines: IProductionLineConfig[] = [
      { code: 'ALL', name: 'ALL' },
      ...lines.map((l) => ({ code: l, name: l }))
    ];

    const shifts: IShiftConfig[] = [
      { code: 'ALL', name: 'ALL' },
      { code: 'SHIFT_A', name: 'SHIFT_A' },
      { code: 'SHIFT_B', name: 'SHIFT_B' },
      { code: 'SHIFT_C', name: 'SHIFT_C' }
    ];

    const dateRanges: IDateRangeConfig[] = [
      { code: 'TODAY', name: 'TODAY' },
      { code: 'YESTERDAY', name: 'YESTERDAY' },
      { code: 'THIS_WEEK', name: 'THIS_WEEK' },
      { code: 'THIS_MONTH', name: 'THIS_MONTH' },
      { code: 'CUSTOM', name: 'CUSTOM' }
    ];

    return {
      plant,
      lines,
      productionLines,
      shifts,
      dateRanges
    };
  }
}

export const configService = new ConfigService();
