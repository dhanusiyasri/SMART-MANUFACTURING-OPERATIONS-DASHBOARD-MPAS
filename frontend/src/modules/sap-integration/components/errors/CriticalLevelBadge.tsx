import React from 'react';
import { CriticalLevel } from '../../types/apiErrorLog.type.js';

interface CriticalLevelBadgeProps {
  level: CriticalLevel;
  className?: string;
}

export const CriticalLevelBadge: React.FC<CriticalLevelBadgeProps> = ({ level, className = '' }) => {
  const levelStyles: Record<CriticalLevel, { bg: string; text: string; border: string; label: string }> = {
    LEVEL_1: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-300',
      label: 'Level 1 (Critical)'
    },
    LEVEL_2: {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      border: 'border-amber-300',
      label: 'Level 2 (High)'
    },
    LEVEL_3: {
      bg: 'bg-brand-100',
      text: 'text-brand-800',
      border: 'border-brand-300',
      label: 'Level 3 (Medium)'
    },
    UNKNOWN: {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-300',
      label: 'Unknown'
    }
  };

  const style = levelStyles[level] || levelStyles.UNKNOWN;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-3xs font-extrabold border tracking-tight uppercase ${style.bg} ${style.text} ${style.border} ${className}`}
    >
      {style.label}
    </span>
  );
};
