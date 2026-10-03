export type TrendDirection = 'UP' | 'DOWN' | 'FLAT';

export interface ITrendOutput {
  change: number;
  percentage: number;
  direction: TrendDirection;
}

/**
 * Calculates absolute change, percentage change, and trend direction between two numerical values.
 * Reusable for every dashboard KPI card (e.g. Production Volume, Error Rates, Throughput).
 */
export function calculateTrend(current: number, previous: number): ITrendOutput {
  const change = parseFloat((current - previous).toFixed(2));

  if (previous === 0) {
    if (current === 0) {
      return { change: 0, percentage: 0, direction: 'FLAT' };
    }
    return {
      change,
      percentage: 100,
      direction: current > 0 ? 'UP' : 'DOWN'
    };
  }

  const rawPercentage = ((current - previous) / Math.abs(previous)) * 100;
  const percentage = parseFloat(rawPercentage.toFixed(1));

  let direction: TrendDirection = 'FLAT';
  if (change > 0.001) direction = 'UP';
  else if (change < -0.001) direction = 'DOWN';

  return {
    change,
    percentage,
    direction
  };
}
