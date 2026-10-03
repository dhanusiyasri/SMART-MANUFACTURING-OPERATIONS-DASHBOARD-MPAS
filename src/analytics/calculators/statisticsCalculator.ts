export interface IStatisticalSummary {
  total: number;
  average: number;
  median: number;
  maximum: number;
  minimum: number;
  growth: number;
}

/**
 * Calculates key statistical summary metrics across a numerical series.
 */
export function calculateStatistics(series: number[]): IStatisticalSummary {
  if (!series || series.length === 0) {
    return { total: 0, average: 0, median: 0, maximum: 0, minimum: 0, growth: 0 };
  }

  const total = series.reduce((sum, val) => sum + val, 0);
  const average = parseFloat((total / series.length).toFixed(2));

  const sorted = [...series].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  const midVal = sorted[mid] ?? 0;
  const prevMidVal = sorted[mid - 1] ?? 0;

  const median = sorted.length % 2 !== 0
    ? midVal
    : parseFloat(((prevMidVal + midVal) / 2).toFixed(2));

  const maximum = sorted[sorted.length - 1] ?? 0;
  const minimum = sorted[0] ?? 0;

  const firstVal = series[0] ?? 0;
  const lastVal = series[series.length - 1] ?? 0;

  const growth = firstVal === 0
    ? (lastVal > 0 ? 100 : 0)
    : parseFloat((((lastVal - firstVal) / Math.abs(firstVal)) * 100).toFixed(1));

  return {
    total,
    average,
    median,
    maximum,
    minimum,
    growth
  };
}
