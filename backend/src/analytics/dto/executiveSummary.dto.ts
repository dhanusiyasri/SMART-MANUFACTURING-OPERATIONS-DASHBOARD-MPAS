import { IHealthScoreOutput } from '../calculators/healthScoreCalculator.js';

export interface IExecutiveSummaryProductionMetrics {
  totalOrders: number;
  todaysOrders: number;
  completedOrders: number;
  pendingOrders: number;
  activeLinesCount: number;
  trend: number[];
  linePerformance?: {
    lineCode: string;
    orderCount: number;
  }[];
  multiLineTrend?: {
    timeCategories: string[];
    series: {
      lineName: string;
      data: number[];
      color?: string;
    }[];
  };
  ordersByStatus: {
    status: string;
    count: number;
  }[];
}

export interface IExecutiveSummaryApiMetrics {
  totalErrors: number;
  todaysErrors: number;
  criticalErrors: number;
  topFailedApi: string;
  timeCategories?: string[];
  errorTrend: number[];
  hourlyHeatmap?: {
    hours: string[];
    lines: string[];
    matrix: [number, number, number][];
  };
  latestErrors?: {
    id: string;
    apiName: string;
    plantCode: string;
    lineCode: string;
    errorCode: string;
    errorMessage: string;
    timestamp: string;
  }[];
}

export interface IExecutiveSummarySyncMetrics {
  totalRecordsProcessed: number;
  todaysRecords: number;
  syncSuccessRate: number;
  peakHour: string;
  timeCategories?: string[];
  syncTrend: number[];
}

export interface IExecutiveSummaryFinishedGoodsMetrics {
  totalFinishedGoods: number;
  todaysFinishedGoods: number;
  weeklyFinishedGoods: number;
  completionRate: number;
  avgProcessingTimeMin: number;
  pendingDispatch: number;
  completedDispatch: number;
  hourlyTrend?: {
    categories: string[];
    data: number[];
  };
  stageDistribution?: {
    name: string;
    value: number;
    color?: string;
  }[];
  completionHeatmap?: {
    hours: string[];
    lines: string[];
    data: number[][];
  };
  shiftDistribution?: {
    plantName: string;
    data: number[];
    color: string;
  }[];
  materialMixTreemap?: {
    name: string;
    value: number;
    children?: {
      name: string;
      value: number;
    }[];
  }[];
  latestEntries?: {
    rowInsertTime: string;
    sequenceNumber: string;
    orderNo: string;
    materialCode: string;
    lineCode: string;
    sapStatusCode: string | number;
  }[];
  plantComparison: {
    plantName: string;
    fgCount: number;
  }[];
}

export interface IExecutiveSummaryMasterDataMetrics {
  totalComponents: number;
  totalMaterials: number;
  activeSkusCount: number;
  criticalIntegrationAlerts?: number;
  componentHierarchy?: {
    name: string;
    value: number;
    children?: { name: string; value: number }[];
  }[];
  topCriticalComponents?: {
    componentName: string;
    dependencyCount: number;
  }[];
}

export interface ILiveFeedItem {
  id: string;
  category: 'ORDER' | 'ERROR' | 'SYNC' | 'FG';
  title: string;
  detail: string;
  timestamp: string;
  badgeText: string;
  badgeVariant: 'green' | 'red' | 'amber' | 'blue';
}

export interface IExecutiveSummaryMetrics {
  overallHealth: number;
  production: IExecutiveSummaryProductionMetrics;
  apiHealth: IExecutiveSummaryApiMetrics;
  synchronization: IExecutiveSummarySyncMetrics;
  finishedGoods: IExecutiveSummaryFinishedGoodsMetrics;
  masterData: IExecutiveSummaryMasterDataMetrics;
  liveFeed?: ILiveFeedItem[];
}

export interface IExecutiveInsight {
  id: string;
  section: string;
  title: string;
  description: string;
  recommendation: string;
  severity: 'OPTIMIZATION' | 'INFO' | 'WARNING' | 'CRITICAL';
}

export interface IOperationalRisk {
  id: string;
  ruleName: string;
  riskLevel: 'CRITICAL' | 'HIGH_RISK' | 'MEDIUM_RISK';
  title: string;
  description: string;
  recommendation: string;
}

export interface IExecutiveSummaryPanel {
  todaysProduction: string;
  currentLineLeader: string;
  topMaterial: string;
  productionTrend: string;
  syncHealth: string;
  apiStatus: string;
  healthScore: number;
  healthStatus: string;
  healthLabel: string;
}

export interface IExecutiveMetadata {
  generatedAt: string;
  dataFreshness: 'REALTIME' | 'NEAR_REALTIME' | 'CACHED';
  executionTimeMs?: number;
  sourceTable?: string;
  appliedFilters?: Record<string, string>;
  rowsReturned?: number;
}

export interface IExecutiveSummaryResponseDTO {
  executiveSummary: IExecutiveSummaryMetrics;
  healthScoreDetail: IHealthScoreOutput;
  executivePanel: IExecutiveSummaryPanel;
  operationalRisks: IOperationalRisk[];
  insights: IExecutiveInsight[];
  metadata: IExecutiveMetadata;
}
