import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
    label?: string;
  };
  progress?: {
    current: number;
    target: number;
  };
  onClick?: () => void;
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  progress,
  onClick,
  className = ''
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between transition-all hover:border-slate-300 ${
        onClick ? 'cursor-pointer hover:shadow-xs hover:bg-slate-50/50' : ''
      } ${className}`}
    >
      <div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          {title}
        </span>
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">{value}</span>
          {trend && (
            <span
              className={`inline-flex items-center text-3xs font-extrabold px-1.5 py-0.5 rounded ${
                trend.isPositive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {trend.isPositive ? '▲' : '▼'} {trend.value}
            </span>
          )}
        </div>
        {subtitle && <p className="text-3xs text-slate-400 font-medium mt-0.5">{subtitle}</p>}
      </div>

      {progress && (
        <div className="mt-2.5 space-y-1">
          <div className="flex justify-between text-3xs text-slate-500 font-medium">
            <span>Target Progress</span>
            <span className="font-bold text-slate-700">{Math.round((progress.current / progress.target) * 100)}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-600 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, Math.round((progress.current / progress.target) * 100))}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
