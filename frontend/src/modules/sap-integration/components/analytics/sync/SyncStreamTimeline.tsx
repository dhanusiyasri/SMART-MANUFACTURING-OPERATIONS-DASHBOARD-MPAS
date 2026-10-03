import React, { memo } from 'react';
import { AnalyticsCard } from '../AnalyticsCard.js';
import { HiOutlineCheckCircle, HiOutlineClock, HiOutlineExclamationCircle } from '../../../../../icons/index.js';

export interface SyncStreamEvent {
  id: string;
  timestamp: string;
  apiName: string;
  recordsCount: number;
  durationMs: number;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  message: string;
}

interface SyncStreamTimelineProps {
  events: SyncStreamEvent[];
  loading?: boolean;
  error?: Error | null;
}

export const SyncStreamTimeline: React.FC<SyncStreamTimelineProps> = memo(({
  events,
  loading = false,
  error = null
}) => {
  return (
    <AnalyticsCard
      title="9. Live Synchronization Event Stream"
      subtitle="Latest Synchronization Events (Socket.IO Ready)"
      tooltipText="Real-time telemetry feed tracking batch sync processing events from SAP_DATA_FOUND_LOG"
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
                <span className="font-mono font-bold text-slate-900">{ev.apiName}</span>
                <span className="text-3xs text-slate-400 font-mono">{ev.timestamp}</span>
              </div>
              <p className="text-3xs text-slate-600 font-medium mt-0.5">
                Records: <span className="font-extrabold text-brand-700">{ev.recordsCount.toLocaleString()}</span> • Latency: <span className="font-bold">{ev.durationMs}ms</span>
              </p>
              <p className="text-3xs text-slate-500 mt-0.5">{ev.message}</p>
            </div>
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
});

SyncStreamTimeline.displayName = 'SyncStreamTimeline';
