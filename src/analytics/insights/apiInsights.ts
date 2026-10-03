import { IAnalyticsInsightDTO } from '../dto/analyticsResponse.dto.js';

export interface IApiInsightInput {
  topFailedApi: string;
  topFailedCount: number;
  criticalLevel1Count: number;
  mailAlertsSent: number;
  mailAlertThreshold?: number;
}

/**
 * Generates rule-based API exception insights for SAP_API_ERROR_LOG.
 * Deterministic business rules only.
 */
export function generateApiInsights(input: IApiInsightInput): IAnalyticsInsightDTO[] {
  const insights: IAnalyticsInsightDTO[] = [];
  const mailThreshold = input.mailAlertThreshold || 100;

  // Rule 1: Top Failed Endpoint
  if (input.topFailedCount > 0) {
    insights.push({
      id: 'api-ins-1',
      title: `${input.topFailedApi} Generated Most Failures`,
      description: `Endpoint ${input.topFailedApi} logged ${input.topFailedCount} failure records today.`,
      recommendation: 'Adjust RFC socket timeout limit and inspect payload lock contention.',
      severity: 'WARNING'
    });
  }

  // Rule 2: Critical Level 1 Spikes
  if (input.criticalLevel1Count > 15) {
    insights.push({
      id: 'api-ins-2',
      title: 'Critical Level 1 Errors Increased Today',
      description: `${input.criticalLevel1Count} Level 1 critical exceptions require immediate engineering review.`,
      recommendation: 'Check plant network gateway connection to SAP S/4HANA core.',
      severity: 'CRITICAL'
    });
  }

  // Rule 3: Mail Triggers Threshold
  if (input.mailAlertsSent > mailThreshold) {
    insights.push({
      id: 'api-ins-3',
      title: 'Mail Alert Triggers Exceeded Threshold',
      description: `${input.mailAlertsSent} automated email notification triggers dispatched today (Threshold: ${mailThreshold}).`,
      recommendation: 'Review alert suppression rules to prevent notification fatigue.',
      severity: 'OPTIMIZATION'
    });
  }

  return insights;
}
