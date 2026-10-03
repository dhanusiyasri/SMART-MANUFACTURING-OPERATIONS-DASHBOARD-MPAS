/**
 * Generic Reusable Percentage & Ratio Calculator Helpers
 */

/**
 * Calculates percentage of a value relative to total with zero division protection.
 */
export function calculatePercentage(part: number, total: number, decimals: number = 1): number {
  if (!total || total === 0 || isNaN(part) || isNaN(total)) {
    return 0;
  }
  const pct = (part / total) * 100;
  return parseFloat(pct.toFixed(decimals));
}

/**
 * Calculates share of total array items for distribution charts (donut/treemap).
 */
export function calculateShareOfTotal<T>(
  items: T[],
  getValue: (item: T) => number
): (T & { percentageShare: number })[] {
  const totalSum = items.reduce((acc, curr) => acc + getValue(curr), 0);
  return items.map((item) => ({
    ...item,
    percentageShare: calculatePercentage(getValue(item), totalSum, 1)
  }));
}
