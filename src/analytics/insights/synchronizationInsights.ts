import { IAnalyticsInsightDTO } from '../dto/analyticsResponse.dto.js';

export interface ISyncInsightInput {
  peakHour: string;
  peakThroughput: number;
  totalSyncVolume: number;
  topVolumeApi: string;
  topVolumeCount: number;
}

/**
 * Generates rule-based synchronization insights for SAP_DATA_FOUND_LOG (4.7M+ rows scale).
 * Deterministic business rules only.
 */
export function generateSynchronizationInsights(input: ISyncInsightInput): IAnalyticsInsightDTO[] {
  const insights: IAnalyticsInsightDTO[] = [];

  // Rule 1: Peak Sync Window
  insights.push({
    id: 'sync-ins-1',
    title: `Peak Synchronization Occurred at ${input.peakHour}`,
    description: `Peak throughput hit ${input.peakThroughput.toLocaleString()} records/min during Shift A window.`,
    recommendation: 'Ensure SQL Server tempdb autogrow settings match peak allocation.',
    severity: 'INFO'
  });

  // Rule 2: Largest Volume API
  insights.push({
    id: 'sync-ins-2',
    title: `${input.topVolumeApi} Processed Largest Volume`,
    description: `${input.topVolumeApi} accounted for ${input.topVolumeCount.toLocaleString()} records (${((input.topVolumeCount / (input.totalSyncVolume || 1)) * 100).toFixed(1)}% of stream).`,
    recommendation: 'Maintain non-clustered index on recordInsertDateTime for fast lookup.',
    severity: 'OPTIMIZATION'
  });

  // Rule 3: High Volume Stream
  if (input.totalSyncVolume > 4000000) {
    insights.push({
      id: 'sync-ins-3',
      title: 'Synchronization Volume Scaling Smoothly',
      description: `Cumulative database log size verified across ${input.totalSyncVolume.toLocaleString()} sync records.`,
      recommendation: 'Perform routine weekly index defragmentation.',
      severity: 'OPTIMIZATION'
    });
  }

  return insights;
}
