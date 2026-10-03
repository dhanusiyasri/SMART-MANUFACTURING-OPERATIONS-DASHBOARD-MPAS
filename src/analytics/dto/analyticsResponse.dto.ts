/**
 * Generic Enterprise Analytics API Response Wrapper DTO
 * Shared envelope across all Power BI / SAP Analytics / Siemens Insights Hub API endpoints.
 */

export interface IAnalyticsInsightDTO {
  id: string;
  title: string;
  description: string;
  recommendation: string;
  severity: 'OPTIMIZATION' | 'INFO' | 'WARNING' | 'CRITICAL';
}

export interface IAnalyticsMetadataDTO {
  generatedAt: string;
  executionTimeMs: number;
  apiVersion: string;
  dataFreshness: 'REALTIME' | 'NEAR_REALTIME' | 'CACHED';
  sourceTables: string[];
}

export interface IAnalyticsEnvelopeResponse<T> {
  success: boolean;
  data: T;
  insights: IAnalyticsInsightDTO[];
  metadata: IAnalyticsMetadataDTO;
}
