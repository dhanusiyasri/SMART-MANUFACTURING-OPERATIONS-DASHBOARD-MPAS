/**
 * Date and Shift Utility Helpers for Enterprise Manufacturing Analytics
 */

export interface IShiftBoundary {
  shiftName: 'Shift A' | 'Shift B' | 'Shift C';
  startTime: string;
  endTime: string;
}

/**
 * Returns active manufacturing shift based on time of day (24-hour clock).
 * Shift A: 06:00 - 14:00
 * Shift B: 14:00 - 22:00
 * Shift C: 22:00 - 06:00
 */
export function getCurrentShift(date: Date = new Date()): 'Shift A' | 'Shift B' | 'Shift C' {
  const hours = date.getHours();
  if (hours >= 6 && hours < 14) return 'Shift A';
  if (hours >= 14 && hours < 22) return 'Shift B';
  return 'Shift C';
}

/**
 * Formats a Date object into ISO timestamp string.
 */
export function formatIsoString(date: Date = new Date()): string {
  return date.toISOString();
}

/**
 * Calculates human-readable data freshness label based on timestamp age.
 */
export function calculateDataFreshness(lastUpdated: Date | string): 'REALTIME' | 'NEAR_REALTIME' | 'CACHED' {
  const dateObj = typeof lastUpdated === 'string' ? new Date(lastUpdated) : lastUpdated;
  const ageMs = Date.now() - dateObj.getTime();

  if (ageMs < 15000) return 'REALTIME'; // < 15s
  if (ageMs < 300000) return 'NEAR_REALTIME'; // < 5 mins
  return 'CACHED';
}

/**
 * Formats a Date object into HH:mm format for 24-hour chart axis labels.
 */
export function formatHourAxis(date: Date = new Date()): string {
  const hours = date.getHours().toString().padStart(2, '0');
  return `${hours}:00`;
}
