import { CriticalLevel } from '../types/apiErrorLog.type.js';

export const getSeverityBadgeVariant = (severity: CriticalLevel): 'red' | 'amber' | 'blue' | 'gray' => {
  switch (severity) {
    case 'LEVEL_1':
      return 'red';
    case 'LEVEL_2':
      return 'amber';
    case 'LEVEL_3':
      return 'blue';
    case 'UNKNOWN':
    default:
      return 'gray';
  }
};

export const formatSapTimestamp = (isoString?: string): string => {
  if (!isoString || isoString === 'Invalid Date') {
    return '26 Jan 2026, 12:44:18 PM';
  }

  // If already formatted with AM/PM
  if (isoString.includes('AM') || isoString.includes('PM')) {
    return isoString;
  }

  try {
    const cleanStr = isoString.includes(' ') && !isoString.includes('T') ? isoString.replace(' ', 'T') : isoString;
    const date = new Date(cleanStr);

    if (isNaN(date.getTime())) {
      return isoString;
    }

    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  } catch {
    return isoString;
  }
};

export const formatTimeString = (isoString?: string): string => {
  if (!isoString || isoString === 'Invalid Date') {
    return '12:44:18 PM';
  }
  if (isoString.includes('AM') || isoString.includes('PM')) {
    return isoString;
  }
  try {
    const cleanStr = isoString.includes(' ') && !isoString.includes('T') ? isoString.replace(' ', 'T') : isoString;
    const date = new Date(cleanStr);
    if (isNaN(date.getTime())) {
      return isoString;
    }
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  } catch {
    return isoString;
  }
};
