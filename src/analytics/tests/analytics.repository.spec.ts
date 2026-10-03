import { AnalyticsRepository } from '../repositories/analytics.repository.js';
import { connectionManager } from '../../database/connectionManager.js';

jest.mock('../../database/connectionManager.js');

describe('AnalyticsRepository Unit Tests', () => {
  let repository: AnalyticsRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new AnalyticsRepository();
  });

  test('should execute SQL queries using pool connection and return Executive Summary DTO', async () => {
    const mockRecordsetResult = (recordset: unknown[]) => ({
      recordset,
      rowsAffected: [recordset.length]
    });

    const mockRequest = {
      input: jest.fn().mockReturnThis(),
      query: jest.fn().mockImplementation((queryText: string) => {
        if (queryText.includes('totalOrders')) {
          return Promise.resolve(
            mockRecordsetResult([
              {
                totalOrders: 5000,
                todaysOrders: 200,
                completedOrders: 4800,
                pendingOrders: 180,
                failedOrders: 20,
                uniqueMaterials: 50,
                activeLines: 3
              }
            ])
          );
        }
        if (queryText.includes('totalErrors')) {
          return Promise.resolve(
            mockRecordsetResult([
              {
                totalErrors: 150,
                todaysErrors: 12,
                criticalLevel1Count: 2,
                highLevel2Count: 4,
                mediumLevel3Count: 6,
                uniqueApisWithErrors: 5
              }
            ])
          );
        }
        if (queryText.includes('SAP_DATA_FOUND_LOG')) {
          return Promise.resolve(
            mockRecordsetResult([
              {
                totalRecords: 100000,
                todaysRecords: 2000,
                avgDuration: 14
              }
            ])
          );
        }
        if (queryText.includes('SAP_FG')) {
          return Promise.resolve(
            mockRecordsetResult([
              {
                totalFG: 800,
                todaysFG: 50
              }
            ])
          );
        }
        if (queryText.includes('SAP_CHILD_MASTER')) {
          return Promise.resolve(
            mockRecordsetResult([
              {
                totalChild: 12000
              }
            ])
          );
        }
        return Promise.resolve(mockRecordsetResult([]));
      })
    };

    const mockPool = {
      request: () => mockRequest
    };

    (connectionManager.getPool as jest.Mock).mockResolvedValue(mockPool);

    const result = await repository.getExecutiveSummary({ plantCode: '2004' });

    expect(connectionManager.getPool).toHaveBeenCalled();
    expect(result.metadata.dataFreshness).toBe('REALTIME');
    expect(result.executiveSummary.production.totalOrders).toBe(5000);
    expect(result.executiveSummary.production.todaysOrders).toBe(200);
    expect(result.executiveSummary.apiHealth.totalErrors).toBe(150);
    expect(result.executiveSummary.apiHealth.topFailedApi).toBe('/sap/updateQRV2');
    expect(result.executiveSummary.synchronization.totalRecordsProcessed).toBe(100000);
    expect(result.executiveSummary.finishedGoods.totalFinishedGoods).toBe(800);
    expect(result.executiveSummary.masterData.totalComponents).toBe(12000);
    expect(result.executiveSummary.masterData.totalMaterials).toBe(6420);
  });

  test('should gracefully handle database query errors and throw when pool connection fails', async () => {
    (connectionManager.getPool as jest.Mock).mockRejectedValue(new Error('SQL Pool Connection Timeout'));

    await expect(repository.getExecutiveSummary()).rejects.toThrow('SQL Pool Connection Timeout');
  });
});
