import { IAnalyticsMetadataDTO } from '../dto/analyticsResponse.dto.js';
import { calculateDataFreshness, formatIsoString } from '../utils/dateHelpers.js';

export interface IMetadataBuilderInput {
  startTimeMs: number;
  sourceTables?: string[];
  apiVersion?: string;
  forcedFreshness?: 'REALTIME' | 'NEAR_REALTIME' | 'CACHED';
}

/**
 * Builds standard metadata payload for every analytics API endpoint response.
 */
export function buildAnalyticsMetadata(input: IMetadataBuilderInput): IAnalyticsMetadataDTO {
  const executionTimeMs = Date.now() - input.startTimeMs;
  const now = new Date();

  return {
    generatedAt: formatIsoString(now),
    executionTimeMs,
    apiVersion: input.apiVersion || 'v1.0.0',
    dataFreshness: input.forcedFreshness || calculateDataFreshness(now),
    sourceTables: input.sourceTables || [
      'SAP_ZPP_SEQ_PLAN',
      'SAP_API_ERROR_LOG',
      'SAP_DATA_FOUND_LOG',
      'SAP_FG',
      'SAP_CHILD_MASTER',
      'SAP_CBN_MASTER'
    ]
  };
}
