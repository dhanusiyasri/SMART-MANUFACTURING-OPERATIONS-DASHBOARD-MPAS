import React, { memo } from 'react';
import { KpiCard } from '../KpiCard.js';
import { InsightCard } from '../InsightCard.js';
import { FgReceiptTrendAreaChart } from './FgReceiptTrendAreaChart.js';
import { FgModelVolumeBarChart } from './FgModelVolumeBarChart.js';
import { DonutChartCard, PieDataItem } from '../DonutChartCard.js';

interface FgIntelligenceSectionProps {
  loading?: boolean;
  error?: Error | null;
}

export const FgIntelligenceSection: React.FC<FgIntelligenceSectionProps> = memo(({
  loading = false,
  error = null
}) => {
  const daysList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const receiptCounts = [142, 168, 185, 210, 245, 198, 220];

  const modelNames = ['AVTR Heavy Commercial', 'BOSS Light Commercial', 'Captain Tipper', 'BADA DOST Truck'];
  const modelVolumes = [840, 520, 390, 240];

  const qualityStatusData: PieDataItem[] = [
    { name: 'PDI Cleared & Released', value: 1680, color: '#10B981' },
    { name: 'Under Quality Inspection', value: 142, color: '#F59E0B' },
    { name: 'Quality Hold / Retrofit', value: 28, color: '#EF4444' }
  ];

  return (
    <div className="space-y-4">
      {/* Executive KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard
          title="FG Receipts Today"
          value="220 VINs"
          subtitle="Movement Type 101"
          trend={{ value: '11%', isPositive: true }}
        />
        <KpiCard
          title="PDI Quality Pass Rate"
          value="98.4%"
          subtitle="Target: > 98.0%"
          trend={{ value: '0.6%', isPositive: true }}
          progress={{ current: 98.4, target: 100 }}
        />
        <KpiCard
          title="Yard Occupancy"
          value="74.2%"
          subtitle="Buffer Capacity"
          trend={{ value: '2.1%', isPositive: false }}
        />
        <KpiCard
          title="SAP Posting Latency"
          value="18 ms"
          subtitle="SAP_FG Ledger"
          trend={{ value: '3ms faster', isPositive: true }}
        />
      </div>

      {/* Decision Insight Alert */}
      <InsightCard
        title="Finished Goods Logistics Operational Insight"
        description="Shift A VIN completions reached 142 units with 0 PDI holds. AVTR 5528 6x4 platform represents 42% of total yard inventory allocation."
        recommendation="Prioritize yard dispatch gate 3 for AVTR transport carriers."
        severity="OPTIMIZATION"
      />

      {/* 12-Column Responsive Power BI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* FG Receipt Trend Area Chart (Col 7) */}
        <div className="lg:col-span-7">
          <FgReceiptTrendAreaChart
            days={daysList}
            receiptCounts={receiptCounts}
            loading={loading}
            error={error}
          />
        </div>

        {/* FG Model Volume Bar Chart (Col 5) */}
        <div className="lg:col-span-5">
          <FgModelVolumeBarChart
            models={modelNames}
            volumes={modelVolumes}
            loading={loading}
            error={error}
          />
        </div>

        {/* Quality Inspection Status Donut (Col 12) */}
        <div className="lg:col-span-12">
          <DonutChartCard
            title="Pre-Delivery Inspection (PDI) Quality Status"
            subtitle="Vehicle clearance breakdown in SAP_FG"
            data={qualityStatusData}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
});

FgIntelligenceSection.displayName = 'FgIntelligenceSection';
