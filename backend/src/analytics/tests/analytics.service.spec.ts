import { AnalyticsService } from '../services/analytics.service.js';
import { IAnalyticsRepository } from '../repositories/analytics.repository.js';
import { IExecutiveSummaryResponseDTO } from '../dto/executiveSummary.dto.js';
import { IAnalyticsFilterDTO } from '../dto/analyticsFilter.dto.js';

describe('AnalyticsService Unit Tests', () => {
  let service: AnalyticsService;
  let mockRepository: jest.Mocked<IAnalyticsRepository>;
  let mockCacheProvider: {
    get: jest.Mock;
    set: jest.Mock;
  };

  const mockDTO: IExecutiveSummaryResponseDTO = {
    executiveSummary: {
      overallHealth: 99.4,
      production: {
        totalOrders: 100,
        todaysOrders: 10,
        completedOrders: 90,
        pendingOrders: 10,
        activeLinesCount: 2,
        trend: [10, 20],
        ordersByStatus: [{ status: 'SUCCESS', count: 90 }]
      },
      apiHealth: {
        totalErrors: 5,
        todaysErrors: 1,
        criticalErrors: 0,
        topFailedApi: '/sap/test',
        errorTrend: [1]
      },
      synchronization: {
        totalRecordsProcessed: 5000,
        todaysRecords: 500,
        syncSuccessRate: 99.9,
        peakHour: '10:00 AM',
        syncTrend: [100]
      },
      finishedGoods: {
        totalFinishedGoods: 30983,
        todaysFinishedGoods: 245,
        weeklyFinishedGoods: 2398,
        completionRate: 99.8,
        avgProcessingTimeMin: 3.2,
        pendingDispatch: 0,
        completedDispatch: 2395,
        plantComparison: [{ plantName: '2004', fgCount: 50 }]
      },
      masterData: {
        totalComponents: 100,
        totalMaterials: 50,
        activeSkusCount: 100
      }
    },
    healthScoreDetail: {
      score: 99.4,
      status: 'EXCELLENT',
      label: 'Excellent',
      color: '#10B981',
      icon: 'check-circle',
      subScores: {
        productionScore: 90,
        apiHealthScore: 99.9,
        syncScore: 99.9,
        finishedGoodsScore: 98,
        masterDataScore: 98.4
      }
    },
    executivePanel: {
      todaysProduction: '10 VINs (100 Total)',
      currentLineLeader: 'Line 0203 (52.0% Share)',
      topMaterial: 'MM30001499 (19.9% Share)',
      productionTrend: '+12.4% vs Previous Period',
      syncHealth: '99.9% (5.00K Syncs)',
      apiStatus: '5 Errors (/sap/test)',
      healthScore: 99.4,
      healthStatus: 'EXCELLENT',
      healthLabel: 'Excellent'
    },
    operationalRisks: [],
    insights: [],
    metadata: {
      generatedAt: new Date().toISOString(),
      dataFreshness: 'REALTIME'
    }
  };

  beforeEach(() => {
    mockRepository = {
      getExecutiveSummary: jest.fn().mockResolvedValue(mockDTO),
      getProductionAnalytics: jest.fn(),
      getApiIntelligence: jest.fn(),
      getSynchronizationAnalytics: jest.fn(),
      getFinishedGoodsAnalytics: jest.fn(),
      getMasterDataAnalytics: jest.fn(),
      getOrderTraceability: jest.fn(),
      getCommandCenterData: jest.fn(),
      getRootCauseAnalysis: jest.fn()
    };

    mockCacheProvider = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined)
    };

    service = new AnalyticsService(mockRepository);
  });

  test('should return REALTIME Executive Summary from repository on cache miss', async () => {
    const filters: IAnalyticsFilterDTO = { plantCode: '2004' };

    const result = await service.getExecutiveSummary(filters);

    expect(mockRepository.getExecutiveSummary).toHaveBeenCalledWith(filters);
    expect(result.metadata.dataFreshness).toBe('REALTIME');
    expect(result.executiveSummary.production.totalOrders).toBe(100);
  });

  test('should return CACHED Executive Summary when Redis cache provider returns hit', async () => {
    service.setCacheProvider(mockCacheProvider);
    mockCacheProvider.get.mockResolvedValueOnce(mockDTO);

    const result = await service.getExecutiveSummary({ plantCode: '2004' });

    expect(mockCacheProvider.get).toHaveBeenCalled();
    expect(mockRepository.getExecutiveSummary).not.toHaveBeenCalled();
    expect(result.metadata.dataFreshness).toBe('CACHED');
  });

  test('should populate Redis cache on cache miss when cache provider is injected', async () => {
    service.setCacheProvider(mockCacheProvider);

    const result = await service.getExecutiveSummary({ plantCode: '2004' });

    expect(mockRepository.getExecutiveSummary).toHaveBeenCalled();
    expect(mockCacheProvider.set).toHaveBeenCalled();
    expect(result.metadata.dataFreshness).toBe('REALTIME');
  });
});
