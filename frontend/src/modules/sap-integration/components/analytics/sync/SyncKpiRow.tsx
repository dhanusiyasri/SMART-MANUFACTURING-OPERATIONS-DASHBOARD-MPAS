import React, { memo } from 'react';
import { KpiCard } from '../KpiCard.js';

export interface SyncKpiSummary {
  successRate: number; // e.g. 99.8%
  totalProcessedToday: number; // e.g. 104,260
  failedSyncs: number; // e.g. 12
  avgProcessingTimeMs: number; // e.g. 14ms
  peakThroughputPerMin: number; // e.g. 4,800 records/min
  longestDelayMs: number; // e.g. 240ms
}

interface SyncKpiRowProps {
  kpis: SyncKpiSummary;
  loading?: boolean;
  error?: Error | null;
  onKpiClick?: (metricKey: string) => void;
}

export const SyncKpiRow: React.FC<SyncKpiRowProps> = memo(({
  kpis,
  onKpiClick
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <KpiCard
        title="Sync Success %"
        value={`${kpis.successRate}%`}
        subtitle="Target: > 99.5%"
        trend={{ value: '0.2%', isPositive: true }}
        progress={{ current: kpis.successRate, target: 100 }}
        onClick={() => onKpiClick && onKpiClick('successRate')}
      />
      <KpiCard
        title="Processed Today"
        value={kpis.totalProcessedToday.toLocaleString()}
        subtitle="4.7M+ Database Scale"
        trend={{ value: '14%', isPositive: true }}
        onClick={() => onKpiClick && onKpiClick('totalProcessed')}
      />
      <KpiCard
        title="Failed Syncs"
        value={kpis.failedSyncs}
        subtitle="SAP_DATA_FOUND_LOG"
        trend={{ value: '3 fewer', isPositive: true }}
        onClick={() => onKpiClick && onKpiClick('failedSyncs')}
      />
      <KpiCard
        title="Avg Processing Time"
        value={`${kpis.avgProcessingTimeMs} ms`}
        subtitle="Batch Latency"
        trend={{ value: '2ms faster', isPositive: true }}
        onClick={() => onKpiClick && onKpiClick('avgTime')}
      />
      <KpiCard
        title="Peak Throughput"
        value={`${kpis.peakThroughputPerMin.toLocaleString()}/m`}
        subtitle="Max Burst Rate"
        trend={{ value: '18%', isPositive: true }}
        onClick={() => onKpiClick && onKpiClick('peakThroughput')}
      />
      <KpiCard
        title="Longest Delay"
        value={`${kpis.longestDelayMs} ms`}
        subtitle="Max Queue Latency"
        trend={{ value: '45ms lower', isPositive: true }}
        onClick={() => onKpiClick && onKpiClick('longestDelay')}
      />
    </div>
  );
});

SyncKpiRow.displayName = 'SyncKpiRow';
