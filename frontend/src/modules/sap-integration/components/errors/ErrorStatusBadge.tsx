import React from 'react';
import { ApiProcessingStatus } from '../../types/apiErrorLog.type.js';

interface ErrorStatusBadgeProps {
  status: ApiProcessingStatus;
  className?: string;
}

export const ErrorStatusBadge: React.FC<ErrorStatusBadgeProps> = ({ status, className = '' }) => {
  const statusStyles: Record<ApiProcessingStatus, { bg: string; text: string; border: string; label: string }> = {
    PENDING: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      label: 'Pending'
    },
    RESOLVED: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      label: 'Resolved'
    },
    RETRYING: {
      bg: 'bg-brand-50',
      text: 'text-brand-700',
      border: 'border-brand-200',
      label: 'Retrying'
    },
    FAILED: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      label: 'Failed'
    },
    SUCCESS: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      label: 'Success'
    }
  };

  const style = statusStyles[status] || statusStyles.FAILED;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${style.bg} ${style.text} ${style.border} ${className}`}
    >
      {style.label}
    </span>
  );
};
