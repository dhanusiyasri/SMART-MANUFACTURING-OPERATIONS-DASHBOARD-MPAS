import React, { memo } from 'react';
import { AnalyticsCard } from '../AnalyticsCard.js';
import { HiOutlineCheckCircle, HiOutlineClock, HiOutlineExclamationCircle } from '../../../../../icons/index.js';

export interface ProductionEvent {
  id: string;
  timestamp: string;
  orderPlnum: string;
  vinNumber: string;
  lineCode: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED' | 'PENDING';
  message: string;
}

interface ProductionTimelineProps {
  events: ProductionEvent[];
  loading?: boolean;
  error?: Error | null;
}

export const ProductionTimeline: React.FC<ProductionTimelineProps> = memo(({
  events,
  loading = false,
  error = null
}) => {
  return (
    <AnalyticsCard
      title="7. Latest Production Events Stream"
      subtitle="Business Question: What are the latest production sequence events?"
      tooltipText="Live timeline tracking order releases, line assignments, and execution updates"
      loading={loading}
      error={error}
    >
      <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
        {events.map((ev) => (
          <div key={ev.id} className="flex items-start space-x-2.5 text-xs">
            <div className="mt-0.5 shrink-0">
              {ev.status === 'SUCCESS' ? (
                <HiOutlineCheckCircle className="w-4 h-4 text-emerald-500" />
              ) : ev.status === 'FAILED' ? (
                <HiOutlineExclamationCircle className="w-4 h-4 text-red-500" />
              ) : (
                <HiOutlineClock className="w-4 h-4 text-amber-500" />
              )}
            </div>
            <div className="flex-1 border-b border-slate-100 pb-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-slate-800">{ev.orderPlnum}</span>
                <span className="text-3xs text-slate-400 font-mono">{ev.timestamp}</span>
              </div>
              <p className="text-3xs text-slate-600 font-medium mt-0.5">
                VIN: <span className="font-mono font-bold text-emerald-700">{ev.vinNumber}</span> • Line: <span className="font-bold text-slate-700">{ev.lineCode}</span>
              </p>
              <p className="text-3xs text-slate-500 mt-0.5">{ev.message}</p>
            </div>
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
});

ProductionTimeline.displayName = 'ProductionTimeline';
