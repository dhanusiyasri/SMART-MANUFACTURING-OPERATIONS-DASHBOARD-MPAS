import React, { memo } from 'react';
import { InsightCard, InsightSeverity } from '../InsightCard.js';

export interface SyncOperationalInsight {
  id: string;
  title: string;
  description: string;
  recommendation: string;
  severity: InsightSeverity;
}

interface SyncInsightPanelProps {
  insights?: SyncOperationalInsight[];
}

const defaultInsights: SyncOperationalInsight[] = [
  {
    id: 'si-1',
    title: 'Top Synchronization Interface Bottleneck',
    description: 'The updateAlarmHistory API processed 42% of today’s total synchronization volume (1.97M records).',
    recommendation: 'Optimize SQL batch partition size for updateAlarmHistory daemon worker.',
    severity: 'INFO'
  },
  {
    id: 'si-2',
    title: 'Morning Shift Peak Throughput Burst',
    description: 'Synchronization volume peaked between 09:00–10:00 at 4,800 records/minute.',
    recommendation: 'Ensure SQL connection pool max limit is set to 25 connections during morning peak.',
    severity: 'OPTIMIZATION'
  },
  {
    id: 'si-3',
    title: 'Shift B Record Volume Surge',
    description: 'Shift B processed 18% more synchronization records than Shift A (1.42M vs 1.20M).',
    recommendation: 'Maintain active memory cache for SAP_CHILD_MASTER during Shift B.',
    severity: 'INFO'
  },
  {
    id: 'si-4',
    title: 'Post-Lunch Sync Failure Elevation',
    description: 'Synchronization failures increased after 13:00 due to SAP batch lock collisions on ZPP_SEQ.',
    recommendation: 'Schedule non-critical master data syncs outside shift transition windows.',
    severity: 'WARNING'
  }
];

export const SyncInsightPanel: React.FC<SyncInsightPanelProps> = memo(({
  insights = defaultInsights
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          10. AI Operational Intelligence Insights Panel
        </h3>
        <span className="text-3xs font-semibold text-slate-500">Automated Performance Analytics Engine</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {insights.map((ins) => (
          <InsightCard
            key={ins.id}
            title={ins.title}
            description={ins.description}
            recommendation={ins.recommendation}
            severity={ins.severity}
          />
        ))}
      </div>
    </div>
  );
});

SyncInsightPanel.displayName = 'SyncInsightPanel';
