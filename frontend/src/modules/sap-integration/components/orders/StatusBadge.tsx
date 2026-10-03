import React from 'react';
import { SAPOrderStatus } from '../../types/sapOrder.type.js';

interface StatusBadgeProps {
  status: SAPOrderStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const statusStyles: Record<SAPOrderStatus, { bg: string; text: string; border: string; dot: string; label: string }> = {
    SUCCESS: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
      label: 'Success'
    },
    WARNING: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
      label: 'Warning'
    },
    FAILED: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      dot: 'bg-red-500',
      label: 'Failed'
    },
    PENDING: {
      bg: 'bg-brand-50',
      text: 'text-brand-700',
      border: 'border-brand-200',
      dot: 'bg-brand-500',
      label: 'Pending'
    },
    UNKNOWN: {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-200',
      dot: 'bg-slate-400',
      label: 'Unknown'
    }
  };

  const style = statusStyles[status] || statusStyles.UNKNOWN;

  return (
    <span
      className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style.bg} ${style.text} ${style.border} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      <span>{style.label}</span>
    </span>
  );
};
