import React, { memo } from 'react';
import { InsightCard, InsightSeverity } from '../InsightCard.js';

export interface FgOperationalInsight {
  id: string;
  title: string;
  description: string;
  recommendation: string;
  severity: InsightSeverity;
}

interface FgInsightPanelProps {
  insights?: FgOperationalInsight[];
}

const defaultInsights: FgOperationalInsight[] = [
  {
    id: 'fgi-1',
    title: 'Top Production Throughput Line Identified',
    description: 'Production Line 0203 generated 53.8% of finished goods (16,640 VIN completions).',
    recommendation: 'Maintain continuous component feeding for Line 0203 buffer station.',
    severity: 'OPTIMIZATION'
  },
  {
    id: 'fgi-2',
    title: 'High Quality Clearance Dominance',
    description: 'MPAS_OK stage clearance represents 100% of total completed vehicle production.',
    recommendation: 'Sustain active quality check parameters across PDI inspection stations.',
    severity: 'INFO'
  },
  {
    id: 'fgi-3',
    title: 'Plant 2004 Total Clearance Rate',
    description: 'Plant 2004 completed 30,983 finished vehicle receipts across Lines 0101, 0201, and 0203.',
    recommendation: 'Allocate additional yard dispatch carriers to Plant 2004 loading bays.',
    severity: 'OPTIMIZATION'
  },
  {
    id: 'fgi-4',
    title: 'Shift B Evening Peak Productivity Window',
    description: 'Finished goods production peaked between 18:00 and 20:00 across active lines.',
    recommendation: 'Ensure Shift C handover inspection begins 15 minutes prior to peak window.',
    severity: 'INFO'
  }
];

export const FgInsightPanel: React.FC<FgInsightPanelProps> = memo(({
  insights = defaultInsights
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          6. Production Intelligence Insights & Executive Recommendations
        </h3>
        <span className="text-3xs font-semibold text-slate-500">Automated Logistics & Assembly Analytics Engine</span>
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

FgInsightPanel.displayName = 'FgInsightPanel';
