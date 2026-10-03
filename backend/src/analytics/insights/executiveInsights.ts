import { IAnalyticsInsightDTO } from '../dto/analyticsResponse.dto.js';

export interface IExecutiveInsightInput {
  productionTotal: number;
  productionCompleted: number;
  apiTodaysErrors: number;
  syncTotalRecords: number;
  fgTotal: number;
  topPlantName?: string;
}

/**
 * Generates rule-based executive insights using deterministic business rules.
 * No AI models or non-deterministic generators used.
 */
export function generateExecutiveInsights(input: IExecutiveInsightInput): IAnalyticsInsightDTO[] {
  const insights: IAnalyticsInsightDTO[] = [];

  // Rule 1: Production Output Insight
  if (input.productionTotal > 0) {
    const completionRate = (input.productionCompleted / input.productionTotal) * 100;
    if (completionRate >= 95) {
      insights.push({
        id: 'exec-ins-1',
        title: 'High Manufacturing Completion Rate Achieved',
        description: `Sequence production completion reached ${completionRate.toFixed(1)}% today (${input.productionCompleted} units).`,
        recommendation: 'Maintain current component buffer staging allocations.',
        severity: 'OPTIMIZATION'
      });
    } else {
      insights.push({
        id: 'exec-ins-1',
        title: 'Production Sequence Lag Detected',
        description: `Sequence completion rate is currently ${completionRate.toFixed(1)}% across assembly lines.`,
        recommendation: 'Inspect feeder line staging for Shift B handover.',
        severity: 'WARNING'
      });
    }
  }

  // Rule 2: API Error Threshold Insight
  if (input.apiTodaysErrors > 50) {
    insights.push({
      id: 'exec-ins-2',
      title: 'Elevated SAP ERP Gateway Exceptions',
      description: `${input.apiTodaysErrors} integration errors logged in SAP_API_ERROR_LOG today.`,
      recommendation: 'Review RFC socket timeout settings and error resolution queue.',
      severity: input.apiTodaysErrors > 100 ? 'CRITICAL' : 'WARNING'
    });
  }

  // Rule 3: Sync Stream Volume Insight
  if (input.syncTotalRecords > 100000) {
    insights.push({
      id: 'exec-ins-3',
      title: 'High-Volume Synchronization Active',
      description: `Fabric synchronization pipeline processed over ${input.syncTotalRecords.toLocaleString()} records today.`,
      recommendation: 'No action required; SQL Server transaction log write throughput within limits.',
      severity: 'INFO'
    });
  }

  return insights;
}
