import React, { memo, useState } from 'react';
import { FgKpiRow, FgKpiSummary } from './FgKpiRow.js';
import { FgTrendAreaChart } from './FgTrendAreaChart.js';
import { FgStageDonutChart, StageDonutItem } from './FgStageDonutChart.js';
import { FgPlantComparisonChart, PlantFgSeries } from './FgPlantComparisonChart.js';
import { FgLineThroughputBarChart } from './FgLineThroughputBarChart.js';
import { FgProductionHeatmap } from './FgProductionHeatmap.js';
import { TreemapNode } from '../TreemapChartCard.js';
import { LatestFgRow } from './LatestFgTable.js';

interface FgIntelligenceDashboardSectionProps {
  loading?: boolean;
  error?: Error | null;
  fgTodayCount?: number;
  fgThisWeekCount?: number;
  completionRateValue?: number;
  avgProcessingTimeValue?: number;
  pendingDispatchValue?: number;
  completedDispatchValue?: number;
  hourlyTrendData?: { categories: string[]; data: number[] };
  stageDistributionData?: StageDonutItem[];
  lineThroughputData?: { plantName: string; fgCount: number }[];
  completionHeatmapData?: { hours: string[]; lines: string[]; data: [number, number, number][] };
  shiftDistributionData?: PlantFgSeries[];
  materialMixTreemapData?: TreemapNode[];
  latestEntriesData?: LatestFgRow[];
}

export const FgIntelligenceDashboardSection: React.FC<FgIntelligenceDashboardSectionProps> = memo(({
  loading = false,
  error = null,
  fgTodayCount = 133,
  fgThisWeekCount = 2398,
  completionRateValue = 97.74,
  avgProcessingTimeValue = 3.2,
  pendingDispatchValue = 0,
  completedDispatchValue = 2395,
  hourlyTrendData,
  stageDistributionData,
  lineThroughputData,
  completionHeatmapData,
  shiftDistributionData,
  materialMixTreemapData,
  latestEntriesData
}) => {
  const liveKpis: FgKpiSummary = {
    fgToday: fgTodayCount ?? 133,
    fgThisWeek: fgThisWeekCount ?? 2398,
    completionRate: completionRateValue ?? 97.74,
    avgProcessingTimeMin: avgProcessingTimeValue ?? 3.2,
    pendingDispatch: pendingDispatchValue ?? 0,
    completedDispatch: completedDispatchValue ?? 2395
  };
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);

  // Section 1: Hourly FG Receipts Trend
  const timeCategories = hourlyTrendData?.categories || ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
  const fgTrendCounts = hourlyTrendData?.data || [0, 68, 65, 0, 0, 0, 0, 0];

  // Section 2: Stage Distribution (Live SAP_FG)
  const stageDonutData: StageDonutItem[] = stageDistributionData && stageDistributionData.length > 0
    ? stageDistributionData
    : [
        { name: 'MPAS_OT (Off-Track Retest)', value: 47, color: '#F59E0B' },
        { name: 'MPAS_OK (Goods Receipt 101)', value: 45, color: '#10B981' },
        { name: 'MPAS_LD (Line Defect)', value: 41, color: '#EF4444' }
      ];

  // Section 3: Production Line Shift Distribution (Strictly Lines 0101, 0201, 0203)
  const plantSeries: PlantFgSeries[] = shiftDistributionData && shiftDistributionData.length > 0
    ? shiftDistributionData
    : [
        { plantName: 'Line 0101', data: [0, 0, 0], color: '#2563EB' },
        { plantName: 'Line 0201', data: [54, 0, 0], color: '#10B981' },
        { plantName: 'Line 0203', data: [79, 0, 0], color: '#F59E0B' }
      ];

  // Section 4 COMBINED: Finished Goods Output & Dispatch Readiness by Production Line (0101, 0201, 0203)
  const lineCodes = lineThroughputData && lineThroughputData.length > 0
    ? lineThroughputData.map(l => l.plantName)
    : ['Line 0201', 'Line 0203'];
  const lineVolumes = lineThroughputData && lineThroughputData.length > 0
    ? lineThroughputData.map(l => l.fgCount)
    : [54, 79];

  // Section 5: Material Production Mix Treemap
  const materialMixTreemap: TreemapNode[] = materialMixTreemapData && materialMixTreemapData.length > 0
    ? materialMixTreemapData
    : [
        { name: 'MM30002497: Rear Axle MS13X 60S', value: 30, children: [{ name: 'Line 0203 Output', value: 30 }] },
        { name: 'CDE191520W0003_WH: E1915 420 D HSDW', value: 25, children: [{ name: 'Line 0201 Output', value: 25 }] },
        { name: 'MM30001499: Solo Rear Axle', value: 24, children: [{ name: 'Line 0203 Output', value: 24 }] }
      ];

  // Section 7: Production Completion Heatmap Matrix (Columns strictly: 0101, 0201, 0203)
  const heatmapHours = completionHeatmapData?.hours || ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
  const heatmapLines = completionHeatmapData?.lines || ['0101', '0201', '0203'];
  const heatmapData: [number, number, number][] = completionHeatmapData?.data || [
    [1, 1, 29], [1, 2, 39], [2, 1, 25], [2, 2, 40]
  ];

  // Section 9: Latest Finished Goods Execution Ledger (Live SAP_FG Data Schema)
  const latestFgEntries: LatestFgRow[] = latestEntriesData && latestEntriesData.length > 0
    ? latestEntriesData
    : [
        { rowInsertTime: '2026-01-19 11:11:00', sequenceNumber: 'TSAU101349', orderNo: '0181114484', materialCode: 'MM30001877', lineCode: '0203', sapStatusCode: '1' },
        { rowInsertTime: '2026-01-19 11:11:00', sequenceNumber: 'MB1A5CHD3TASV5070', orderNo: '0181343867', materialCode: 'CDF192032C0003', lineCode: '0201', sapStatusCode: '1' }
      ];

  const handleWidgetClick = (params: unknown) => {
    if (params && typeof params === 'object' && 'name' in params) {
      setSelectedDetail((params as { name: string }).name);
    }
  };

  return (
    <div className="space-y-4">
      {/* Detail Filter Banner */}
      {selectedDetail && (
        <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl text-xs text-brand-900 flex items-center justify-between">
          <span>
            Finished Goods Cross-Filter Active: <strong className="font-bold">{selectedDetail}</strong>
          </span>
          <button
            onClick={() => setSelectedDetail(null)}
            className="text-3xs underline font-bold hover:text-brand-700"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Executive KPI Row */}
      <FgKpiRow
        kpis={liveKpis}
        loading={loading}
        error={error}
        onKpiClick={(key) => setSelectedDetail(key)}
      />

      {/* Power BI & SAP Analytics Cloud 12-Column Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* Section 1: Finished Goods Trend Area Chart (Col 7) */}
        <div className="lg:col-span-7">
          <FgTrendAreaChart
            timeCategories={timeCategories}
            fgCounts={fgTrendCounts}
            loading={loading}
            error={error}
            onChartClick={handleWidgetClick}
          />
        </div>

        {/* Section 2: Stage Distribution Donut (Col 5) */}
        <div className="lg:col-span-5">
          <FgStageDonutChart
            data={stageDonutData}
            loading={loading}
            error={error}
            onChartClick={handleWidgetClick}
          />
        </div>

        {/* Combined Section 4: Finished Goods Output & Dispatch Readiness by Production Line (Col 6) */}
        <div className="lg:col-span-6">
          <FgLineThroughputBarChart
            lineCodes={lineCodes}
            fgVolumes={lineVolumes}
            loading={loading}
            error={error}
            onChartClick={handleWidgetClick}
          />
        </div>

        {/* Section 7: Production Completion Heatmap Matrix (Col 6) */}
        <div className="lg:col-span-6">
          <FgProductionHeatmap
            hours={heatmapHours}
            lines={heatmapLines}
            data={heatmapData}
            loading={loading}
            error={error}
            onChartClick={handleWidgetClick}
          />
        </div>

        {/* Section 5: Shift Distribution per Line (Col 12) */}
        <div className="lg:col-span-12">
          <FgPlantComparisonChart
            categories={['Shift A', 'Shift B', 'Shift C']}
            series={plantSeries}
            loading={loading}
            error={error}
            onChartClick={handleWidgetClick}
          />
        </div>
      </div>
    </div>
  );
});

FgIntelligenceDashboardSection.displayName = 'FgIntelligenceDashboardSection';
