export interface IApiIntelligenceKpis {
  totalErrors: number;
  todaysErrors: number;
  criticalLevel1Count: number;
  highLevel2Count: number;
  mediumLevel3Count: number;
  topFailedApi: string;
  uniqueApisWithErrors: number;
}

export interface IApiErrorTrend {
  timeCategories: string[];
  series: {
    levelName: string;
    data: number[];
    color?: string;
  }[];
}

export interface ITopFailedApiItem {
  apiName: string;
  failureCount: number;
}

export interface ICriticalityDistributionItem {
  levelName: string;
  count: number;
  color?: string;
}

export interface IPlantErrorAnalysis {
  plantName: string;
  errorCount: number;
}

export interface ILineErrorAnalysis {
  lineCode: string;
  errorCount: number;
}

export interface IStatusCodeDistributionTreeNode {
  name: string;
  value: number;
  children?: { name: string; value: number }[];
}

export interface IMailTriggerAnalysis {
  totalAlertsSent: number;
  pendingMailTriggers: number;
  failedAlerts: number;
}

export interface ILatestApiErrorRecord {
  id: string;
  apiName: string;
  plantCode: string;
  lineCode: string;
  referenceId: string;
  errorCode: string;
  errorMessage: string;
  criticalLevel: string;
  status: string;
  timestamp: string;
}

export interface IApiIntelligenceInsight {
  id: string;
  title: string;
  description: string;
  recommendation: string;
  severity: 'OPTIMIZATION' | 'INFO' | 'WARNING' | 'CRITICAL';
}

export interface IApiIntelligenceMetadata {
  generatedAt: string;
  dataFreshness: 'REALTIME' | 'NEAR_REALTIME' | 'CACHED';
  executionTimeMs?: number;
}

export interface IApiIntelligenceResponseDTO {
  kpis: IApiIntelligenceKpis;
  errorTrend: IApiErrorTrend;
  topFailedApis: ITopFailedApiItem[];
  criticalityDistribution: ICriticalityDistributionItem[];
  frequentMessages?: { errorMessage: string; errorCount: number }[];
  hourlyHeatmap?: { hours: string[]; lines: string[]; matrix: [number, number, number][] };
  plantErrorAnalysis: IPlantErrorAnalysis[];
  lineErrorAnalysis: ILineErrorAnalysis[];
  statusCodeDistribution: IStatusCodeDistributionTreeNode[];
  mailTriggerAnalysis: IMailTriggerAnalysis;
  latestErrors: ILatestApiErrorRecord[];
  insights: IApiIntelligenceInsight[];
  metadata: IApiIntelligenceMetadata;
}
