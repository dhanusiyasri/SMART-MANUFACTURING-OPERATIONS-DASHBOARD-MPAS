/**
 * Formatting Utility Helpers for Manufacturing KPI Displays
 */

/**
 * Formats a number with comma separators for large values (e.g. 4,720,000).
 */
export function formatNumberWithCommas(value: number): string {
  if (isNaN(value)) return '0';
  return value.toLocaleString('en-IN');
}

/**
 * Formats a decimal number into a percentage string (e.g., 99.8%).
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  if (isNaN(value)) return '0.0%';
  return `${value.toFixed(decimals)}%`;
}

/**
 * Formats throughput rate into units/hr or records/min string.
 */
export function formatThroughputRate(value: number, unit: 'units/hr' | 'records/min' = 'units/hr'): string {
  if (isNaN(value)) return `0 ${unit}`;
  return `${formatNumberWithCommas(Math.round(value))} ${unit}`;
}

/**
 * Capitalizes snake_case or UPPER_CASE strings for UI presentation.
 */
export function formatLabel(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
