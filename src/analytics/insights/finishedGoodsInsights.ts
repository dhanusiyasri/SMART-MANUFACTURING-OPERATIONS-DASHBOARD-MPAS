import { IAnalyticsInsightDTO } from '../dto/analyticsResponse.dto.js';

export interface IFinishedGoodsInsightInput {
  completionRate: number;
  targetRate?: number;
  topPlantName: string;
  topPlantFgCount: number;
  pendingDispatchCount: number;
}

/**
 * Generates rule-based finished goods insights for SAP_FG.
 * Deterministic business rules only.
 */
export function generateFinishedGoodsInsights(input: IFinishedGoodsInsightInput): IAnalyticsInsightDTO[] {
  const insights: IAnalyticsInsightDTO[] = [];
  const target = input.targetRate || 95.0;

  // Rule 1: Target Completion Rate
  if (input.completionRate >= target) {
    insights.push({
      id: 'fg-ins-1',
      title: 'Completion Rate Exceeded Target',
      description: `Finished goods completion rate reached ${input.completionRate.toFixed(1)}% (Target: ${target}%).`,
      recommendation: 'Coordinate with logistics yard for vehicle dispatch scheduling.',
      severity: 'OPTIMIZATION'
    });
  } else {
    insights.push({
      id: 'fg-ins-1',
      title: 'Finished Goods Completion Rate Below Target',
      description: `Completion rate is currently ${input.completionRate.toFixed(1)}% (Target: ${target}%).`,
      recommendation: 'Check Quality Sign-Off bottlenecks at end-of-line testing station.',
      severity: 'WARNING'
    });
  }

  // Rule 2: Top Producing Plant
  insights.push({
    id: 'fg-ins-2',
    title: `Plant ${input.topPlantName} Produced Most Finished Goods`,
    description: `Plant ${input.topPlantName} completed ${input.topPlantFgCount.toLocaleString()} chassis units today.`,
    recommendation: 'Schedule dispatch transport carriers for Plant ' + input.topPlantName + '.',
    severity: 'INFO'
  });

  // Rule 3: Pending Dispatch Buffer
  if (input.pendingDispatchCount > 30) {
    insights.push({
      id: 'fg-ins-3',
      title: 'Yard Staging Buffer Elevated',
      description: `${input.pendingDispatchCount} completed chassis units awaiting final gate pass dispatch.`,
      recommendation: 'Expedite SAP Movement 101 gate clearance.',
      severity: 'WARNING'
    });
  }

  return insights;
}
