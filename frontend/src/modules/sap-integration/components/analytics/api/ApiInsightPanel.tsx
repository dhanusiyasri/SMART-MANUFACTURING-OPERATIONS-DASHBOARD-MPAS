import React, { memo } from 'react';
import { InsightCard, InsightSeverity } from '../InsightCard.js';

export interface ApiOperationalInsight {
  id: string;
  title: string;
  description: string;
  recommendation: string;
  severity: InsightSeverity;
}

interface ApiInsightPanelProps {
  insights?: ApiOperationalInsight[];
}

const defaultInsights: ApiOperationalInsight[] = [
  {
    id: 'ai-1',
    title: 'Top Failure Driver Endpoint Identified',
    description: 'The /api/v1/sap/updateQRV2 API generated 62% of today’s total integration failures (48 logs).',
    recommendation: 'Increase connection pool timeout threshold on DHANUSIYASRI SQL Server for QRV2 service.',
    severity: 'CRITICAL'
  },
  {
    id: 'ai-2',
    title: 'Concentrated ETIMEOUT Cluster on Line 0201',
    description: 'Most ETIMEOUT (HTTP 504) handshake events occurred on Line 0201 (Chassis Assembly Line 2).',
    recommendation: 'Check gateway switch latency on Line 0201 edge PLC router.',
    severity: 'WARNING'
  },
  {
    id: 'ai-3',
    title: 'Shift B Critical Level 2 Incident Increase',
    description: 'Critical Level 2 incidents increased by 14% during Shift B transition (14:30 - 16:00).',
    recommendation: 'Review SAP batch lock scheduler timing during shift handovers.',
    severity: 'OPTIMIZATION'
  }
];

export const ApiInsightPanel: React.FC<ApiInsightPanelProps> = memo(({
  insights = defaultInsights
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          10. AI Operational Insights & Decision Panel
        </h3>
        <span className="text-3xs font-semibold text-slate-500">Automated Analytics Engine</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

ApiInsightPanel.displayName = 'ApiInsightPanel';
