export interface ISyncKpis {
  totalRecordsProcessed: number;
  todaysRecordsProcessed: number;
  syncSuccessRate: number;
  avgProcessingTimeMs: number;
  peakThroughputPerMin: number;
  topSyncApi: string;
}

export interface ISyncVolumeTrend {
  timeCategories: string[];
  recordsCount: number[];
}

export interface IApiThroughputItem {
  apiName: string;
  volumeCount: number;
}

export interface IPlantSyncComparison {
  plantName: string;
  syncVolume: number;
}

export interface ILineSyncComparison {
  lineCode: string;
  syncVolume: number;
}

export interface IHourlySyncThroughput {
  hour: string;
  throughputPerMin: number;
}

export interface ISyncApiHeatmap {
  hours: string[];
  apis: string[];
  matrix: [number, number, number][];
}

export interface ILatestSyncActivityRecord {
  id: string;
  batchId: string;
  sourceSystem: string;
  targetTable: string;
  recordsFound: number;
  recordsProcessed: number;
  recordsFailed: number;
  durationMs: number;
  status: string;
  timestamp: string;
}

export interface ISyncInsight {
  id: string;
  title: string;
  description: string;
  recommendation: string;
  severity: 'OPTIMIZATION' | 'INFO' | 'WARNING' | 'CRITICAL';
}

export interface ISyncMetadata {
  generatedAt: string;
  dataFreshness: 'REALTIME' | 'NEAR_REALTIME' | 'CACHED';
  executionTimeMs?: number;
}

export interface ISynchronizationAnalyticsResponseDTO {
  kpis: ISyncKpis;
  synchronizationTrend: ISyncVolumeTrend;
  apiThroughput: IApiThroughputItem[];
  plantComparison: IPlantSyncComparison[];
  lineComparison: ILineSyncComparison[];
  hourlyThroughput: IHourlySyncThroughput[];
  apiHeatmap: ISyncApiHeatmap;
  avgRecordsPerExecution: number;
  latestActivity: ILatestSyncActivityRecord[];
  insights: ISyncInsight[];
  metadata: ISyncMetadata;
}
