import React, { memo } from 'react';
import { KpiCard } from '../KpiCard.js';

export interface FgKpiSummary {
  fgToday: number; // e.g. 245
  fgThisWeek: number; // e.g. 1,680
  completionRate: number; // e.g. 98.4%
  avgProcessingTimeMin: number; // e.g. 42 min
  pendingDispatch: number; // e.g. 38
  completedDispatch: number; // e.g. 207
}

interface FgKpiRowProps {
  kpis: FgKpiSummary;
  loading?: boolean;
  error?: Error | null;
  onKpiClick?: (metricKey: string) => void;
}

export const FgKpiRow: React.FC<FgKpiRowProps> = memo(({
  kpis,
  onKpiClick
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <KpiCard
        title="Finished Goods Today"
        value={`${kpis.fgToday} VINs`}
        subtitle="Movement Type 101"
        trend={{ value: '12%', isPositive: true }}
        onClick={() => onKpiClick && onKpiClick('fgToday')}
      />
      <KpiCard
        title="Finished Goods Week"
        value={kpis.fgThisWeek.toLocaleString()}
        subtitle="7-Day Cumulative"
        trend={{ value: '8.4%', isPositive: true }}
        onClick={() => onKpiClick && onKpiClick('fgThisWeek')}
      />
      <KpiCard
        title="Completion Rate"
        value={`${kpis.completionRate}%`}
        subtitle="Target: > 98.0%"
        trend={{ value: '0.6%', isPositive: true }}
        progress={{ current: kpis.completionRate, target: 100 }}
        onClick={() => onKpiClick && onKpiClick('completionRate')}
      />
      <KpiCard
        title="Avg Processing Time"
        value={`${kpis.avgProcessingTimeMin} min`}
        subtitle="Line Off to Yard"
        trend={{ value: '4 min faster', isPositive: true }}
        onClick={() => onKpiClick && onKpiClick('avgTime')}
      />
      <KpiCard
        title="Pending Dispatch"
        value={`${kpis.pendingDispatch} Units`}
        subtitle="Yard Holding Bay"
        trend={{ value: '4 cleared', isPositive: true }}
        onClick={() => onKpiClick && onKpiClick('pendingDispatch')}
      />
      <KpiCard
        title="Completed Dispatch"
        value={`${kpis.completedDispatch} Units`}
        subtitle="Gate Exit Cleared"
        trend={{ value: '15 units', isPositive: true }}
        onClick={() => onKpiClick && onKpiClick('completedDispatch')}
      />
    </div>
  );
});

FgKpiRow.displayName = 'FgKpiRow';
