import React, { memo } from 'react';
import { AnalyticsCard } from '../AnalyticsCard.js';
import { HiOutlineExclamationCircle, HiOutlineClock, HiOutlineCheckCircle } from '../../../../../icons/index.js';

export interface IncidentEvent {
  id: string;
  timestamp: string;
  apiName: string;
  plantCode: string;
  status: 'FAILED' | 'RETRYING' | 'RESOLVED';
  summary: string;
}

interface IncidentTimelineProps {
  incidents: IncidentEvent[];
  loading?: boolean;
  error?: Error | null;
}

export const IncidentTimeline: React.FC<IncidentTimelineProps> = memo(({
  incidents,
  loading = false,
  error = null
}) => {
  return (
    <AnalyticsCard
      title="6. Incident Stream Timeline"
      subtitle='Question Answered: "What happened today?"'
      tooltipText="Chronological feed of API exceptions, auto-retries, and resolution triggers"
      loading={loading}
      error={error}
    >
      <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
        {incidents.map((inc) => (
          <div key={inc.id} className="flex items-start space-x-2.5 text-xs">
            <div className="mt-0.5 shrink-0">
              {inc.status === 'FAILED' ? (
                <HiOutlineExclamationCircle className="w-4 h-4 text-red-500" />
              ) : inc.status === 'RETRYING' ? (
                <HiOutlineClock className="w-4 h-4 text-amber-500" />
              ) : (
                <HiOutlineCheckCircle className="w-4 h-4 text-emerald-500" />
              )}
            </div>
            <div className="flex-1 border-b border-slate-100 pb-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-slate-900">{inc.apiName}</span>
                <span className="text-3xs text-slate-400 font-mono">{inc.timestamp}</span>
              </div>
              <p className="text-3xs text-slate-600 font-medium mt-0.5">
                Plant: <span className="font-bold text-slate-800">{inc.plantCode}</span> • Status: <span className="font-bold">{inc.status}</span>
              </p>
              <p className="text-3xs text-slate-500 mt-0.5">{inc.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
});

IncidentTimeline.displayName = 'IncidentTimeline';
