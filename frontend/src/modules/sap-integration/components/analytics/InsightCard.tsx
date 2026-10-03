import React from 'react';
import { HiOutlineExclamationCircle, HiOutlineCheckCircle, HiOutlineInformationCircle } from '../../../../icons/index.js';

export type InsightSeverity = 'CRITICAL' | 'WARNING' | 'OPTIMIZATION' | 'INFO';

interface InsightCardProps {
  title: string;
  description: string;
  recommendation?: string;
  severity: InsightSeverity;
  className?: string;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  title,
  description,
  recommendation,
  severity,
  className = ''
}) => {
  const severityStyles: Record<InsightSeverity, { bg: string; border: string; text: string; icon: React.ReactNode }> = {
    CRITICAL: {
      bg: 'bg-red-50/70',
      border: 'border-red-200',
      text: 'text-red-900',
      icon: <HiOutlineExclamationCircle className="w-5 h-5 text-red-600 shrink-0" />
    },
    WARNING: {
      bg: 'bg-amber-50/70',
      border: 'border-amber-200',
      text: 'text-amber-900',
      icon: <HiOutlineExclamationCircle className="w-5 h-5 text-amber-600 shrink-0" />
    },
    OPTIMIZATION: {
      bg: 'bg-emerald-50/70',
      border: 'border-emerald-200',
      text: 'text-emerald-900',
      icon: <HiOutlineCheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
    },
    INFO: {
      bg: 'bg-brand-50/70',
      border: 'border-brand-200',
      text: 'text-brand-900',
      icon: <HiOutlineInformationCircle className="w-5 h-5 text-brand-600 shrink-0" />
    }
  };

  const style = severityStyles[severity] || severityStyles.INFO;

  return (
    <div className={`p-3.5 border rounded-xl flex items-start space-x-3 text-xs ${style.bg} ${style.border} ${style.text} ${className}`}>
      {style.icon}
      <div className="flex-1">
        <h4 className="font-bold text-xs tracking-tight">{title}</h4>
        <p className="mt-0.5 opacity-90 leading-normal">{description}</p>
        {recommendation && (
          <div className="mt-2 pt-1.5 border-t border-slate-200/50 font-semibold text-3xs uppercase tracking-wider text-slate-700">
            Recommended Action: <span className="font-bold text-slate-900">{recommendation}</span>
          </div>
        )}
      </div>
    </div>
  );
};
