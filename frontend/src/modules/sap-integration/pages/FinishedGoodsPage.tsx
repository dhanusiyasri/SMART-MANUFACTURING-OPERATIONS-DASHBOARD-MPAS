import React, { memo } from 'react';
import { useFinishedGoods } from '../hooks/useFinishedGoods.js';
import { useSapOverview } from '../hooks/useSapOverview.js';
import { FgIntelligenceDashboardSection } from '../components/analytics/fg/FgIntelligenceDashboardSection.js';
import { Badge } from '../../../components/common/Badge.js';
import { Button } from '../../../components/common/Button.js';
import { HiOutlineRefresh } from '../../../icons/index.js';

export const FinishedGoodsPage: React.FC = memo(() => {
  const { isLoading: isFgLoading, error: fgError, refetch, isRealtimeConnected } = useFinishedGoods();
  const { data: summaryData, isLoading: isSummaryLoading } = useSapOverview();
  const summary = summaryData?.summary;

  return (
    <div className="space-y-5">
      {/* Sub-Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Finished Goods (FG) Intelligence & Dispatch Control (SAP_FG)
            </h2>
            <Badge variant={isRealtimeConnected ? 'green' : 'blue'}>
              {isRealtimeConnected ? 'Socket.IO Live Telemetry' : 'Movement 101 Synced'}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Microsoft Power BI & SAP Analytics Cloud-inspired dashboard for vehicle completions & yard dispatch readiness
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            icon={<HiOutlineRefresh className="w-4 h-4" />}
            onClick={() => refetch()}
          >
            Refresh FG Intelligence
          </Button>
        </div>
      </div>

      {/* Dedicated Finished Goods Intelligence Dashboard Section */}
      <FgIntelligenceDashboardSection 
        loading={isFgLoading || isSummaryLoading} 
        error={fgError} 
        fgTodayCount={summary?.finishedGoods.todaysFG}
        fgThisWeekCount={summary?.finishedGoods.weeklyFinishedGoods}
        completionRateValue={summary?.finishedGoods.completionRate}
        avgProcessingTimeValue={summary?.finishedGoods.avgProcessingTimeMin}
        pendingDispatchValue={summary?.finishedGoods.pendingDispatch}
        completedDispatchValue={summary?.finishedGoods.completedDispatch}
        hourlyTrendData={summary?.finishedGoods.hourlyTrend}
        stageDistributionData={summary?.finishedGoods.stageDistribution}
        lineThroughputData={summary?.finishedGoods.plantComparison}
        completionHeatmapData={summary?.finishedGoods.completionHeatmap}
        shiftDistributionData={summary?.finishedGoods.shiftDistribution}
        materialMixTreemapData={summary?.finishedGoods.materialMixTreemap}
        latestEntriesData={summary?.finishedGoods.latestEntries}
      />
    </div>
  );
});

FinishedGoodsPage.displayName = 'SAP_FinishedGoodsPage';
export default FinishedGoodsPage;
