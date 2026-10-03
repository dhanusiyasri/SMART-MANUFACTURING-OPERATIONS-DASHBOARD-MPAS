import { IAnalyticsInsightDTO } from '../dto/analyticsResponse.dto.js';

export interface IProductionInsightInput {
  topPlantName: string;
  topPlantOrderCount: number;
  topLineCode: string;
  topLineThroughput: number;
  avgLineThroughput: number;
  failedOrderCount: number;
}

/**
 * Generates rule-based production insights for SAP_ZPP_SEQ_PLAN sequence planning.
 * Deterministic business logic only.
 */
export function generateProductionInsights(input: IProductionInsightInput): IAnalyticsInsightDTO[] {
  const insights: IAnalyticsInsightDTO[] = [];

  // Rule 1: Top Plant Output
  insights.push({
    id: 'prod-ins-1',
    title: `Plant ${input.topPlantName} Leading Output`,
    description: `Plant ${input.topPlantName} generated ${input.topPlantOrderCount.toLocaleString()} production sequence orders today.`,
    recommendation: 'Ensure component replenishment schedules match assembly speed.',
    severity: 'INFO'
  });

  // Rule 2: Above Average Line Performance
  if (input.topLineThroughput > input.avgLineThroughput) {
    const diffPct = (((input.topLineThroughput - input.avgLineThroughput) / input.avgLineThroughput) * 100).toFixed(1);
    insights.push({
      id: 'prod-ins-2',
      title: `${input.topLineCode} Above Average Throughput`,
      description: `${input.topLineCode} throughput is ${diffPct}% above line average (${input.topLineThroughput} vs ${input.avgLineThroughput} avg).`,
      recommendation: 'Replicate tooling and buffer staging setup on lower-volume lines.',
      severity: 'OPTIMIZATION'
    });
  }

  // Rule 3: Sequence Failure Alert
  if (input.failedOrderCount > 10) {
    insights.push({
      id: 'prod-ins-3',
      title: 'Elevated Sequence Plan Failures',
      description: `${input.failedOrderCount} production orders flagged in FAILED state.`,
      recommendation: 'Check QR validation queue and chassis frame sequencing rules.',
      severity: 'WARNING'
    });
  }

  return insights;
}
