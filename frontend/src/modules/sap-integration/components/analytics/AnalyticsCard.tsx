import React, { ReactNode } from 'react';
import { HiOutlineExclamationCircle, HiOutlineInformationCircle } from '../../../../icons/index.js';

interface AnalyticsCardProps {
  title: string;
  subtitle?: string;
  tooltipText?: string;
  actions?: ReactNode;
  loading?: boolean;
  error?: Error | null;
  isEmpty?: boolean;
  emptyMessage?: string;
  className?: string;
  children: ReactNode;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  subtitle,
  tooltipText,
  actions,
  loading = false,
  error = null,
  isEmpty = false,
  emptyMessage = 'No analytical data available for selected filter range.',
  className = '',
  children
}) => {
  return (
    <div
      className={`bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs flex flex-col justify-between transition-all hover:border-slate-300 ${className}`}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center space-x-1.5">
            <h3 className="text-xs font-bold text-slate-900 tracking-tight">{title}</h3>
            {tooltipText && (
              <span className="group relative cursor-help">
                <HiOutlineInformationCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block w-48 p-2 bg-slate-900 text-white text-3xs rounded shadow-md z-30 pointer-events-none whitespace-normal leading-tight">
                  {tooltipText}
                </span>
              </span>
            )}
          </div>
          {subtitle && <p className="text-3xs text-slate-500 font-medium mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center space-x-1">{actions}</div>}
      </div>

      {/* Card Body */}
      <div className="flex-1 relative min-h-[160px] flex flex-col justify-center">
        {loading ? (
          <div className="animate-pulse space-y-3 w-full p-2">
            <div className="h-4 bg-slate-200 rounded w-3/4" />
            <div className="h-24 bg-slate-100 rounded w-full" />
            <div className="h-3 bg-slate-200 rounded w-1/2" />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50/60 border border-red-200 rounded-lg text-red-700 flex items-center space-x-2 text-xs">
            <HiOutlineExclamationCircle className="w-5 h-5 shrink-0 text-red-500" />
            <div>
              <p className="font-bold">Chart Render Failure</p>
              <p className="text-3xs text-red-600 mt-0.5">{error.message}</p>
            </div>
          </div>
        ) : isEmpty ? (
          <div className="text-center py-8 text-slate-400 text-xs font-medium">
            {emptyMessage}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
