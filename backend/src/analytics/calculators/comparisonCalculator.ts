import { calculateTrend, TrendDirection } from './trendCalculator.js';

export interface IComparisonOutput {
  current: number;
  previous: number;
  difference: number;
  percentageDifference: number;
  trendDirection: TrendDirection;
}

/**
 * Compares current period metric with previous period metric, returning
 * absolute difference, percentage difference, and trend direction.
 */
export function compareMetrics(current: number, previous: number): IComparisonOutput {
  const trend = calculateTrend(current, previous);
  return {
    current,
    previous,
    difference: trend.change,
    percentageDifference: trend.percentage,
    trendDirection: trend.direction
  };
}
