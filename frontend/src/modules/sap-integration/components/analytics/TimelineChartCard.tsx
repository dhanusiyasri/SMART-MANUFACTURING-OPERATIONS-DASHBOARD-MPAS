import React, { memo } from 'react';
import { AnalyticsCard } from './AnalyticsCard.js';
import { HiOutlineClock, HiOutlineExclamationCircle, HiOutlineCheckCircle } from '../../../../icons/index.js';

export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: 'ERROR' | 'SYNC' | 'ORDER' | 'FG';
}

interface TimelineChartCardProps {
  title: string;
  subtitle?: string;
  events: TimelineEvent[];
  loading?: boolean;
  error?: Error | null;
}

export const TimelineChartCard: React.FC<TimelineChartCardProps> = memo(({
  title,
  subtitle,
  events,
  loading = false,
  error = null
}) => {
  return (
    <AnalyticsCard title={title} subtitle={subtitle} loading={loading} error={error}>
      <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
        {events.map((ev) => (
          <div key={ev.id} className="flex items-start space-x-2.5 text-xs">
            <div className="mt-0.5 shrink-0">
              {ev.type === 'ERROR' ? (
                <HiOutlineExclamationCircle className="w-4 h-4 text-red-500" />
              ) : ev.type === 'SYNC' ? (
                <HiOutlineClock className="w-4 h-4 text-amber-500" />
              ) : (
                <HiOutlineCheckCircle className="w-4 h-4 text-emerald-500" />
              )}
            </div>
            <div className="flex-1 border-b border-slate-100 pb-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">{ev.title}</span>
                <span className="text-3xs text-slate-400 font-mono">{ev.timestamp}</span>
              </div>
              <p className="text-3xs text-slate-500 mt-0.5">{ev.description}</p>
            </div>
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
});

TimelineChartCard.displayName = 'TimelineChartCard';
