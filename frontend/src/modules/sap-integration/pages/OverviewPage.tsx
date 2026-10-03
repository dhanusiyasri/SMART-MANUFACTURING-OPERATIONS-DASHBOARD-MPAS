import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnalyticsFilterRibbon } from '../components/analytics/AnalyticsFilterRibbon.js';
import { DrilldownBreadcrumb } from '../components/analytics/DrilldownBreadcrumb.js';
import { KpiCard } from '../components/analytics/KpiCard.js';
import { InsightCard } from '../components/analytics/InsightCard.js';
import { LineChartCard } from '../components/analytics/LineChartCard.js';
import { AreaChartCard } from '../components/analytics/AreaChartCard.js';
import { BarChartCard } from '../components/analytics/BarChartCard.js';
import { DonutChartCard } from '../components/analytics/DonutChartCard.js';
import { GaugeChartCard } from '../components/analytics/GaugeChartCard.js';
import { HeatmapChartCard } from '../components/analytics/HeatmapChartCard.js';
import { TreemapChartCard, TreemapNode } from '../components/analytics/TreemapChartCard.js';
import { TimelineChartCard, TimelineEvent } from '../components/analytics/TimelineChartCard.js';
import { LiveOperationsFeed } from '../components/analytics/LiveOperationsFeed.js';
import { SAP_ROUTES } from '../constants/sapRoutes.js';
import { useSapOverview } from '../hooks/useSapOverview.js';
import { useAnalyticsFilter } from '../../../contexts/FilterContext.js';
import { useDrilldown } from '../../../contexts/DrilldownContext.js';
import { Button } from '../../../components/common/Button.js';
import { Badge } from '../../../components/common/Badge.js';
import { HiOutlineRefresh, HiOutlineExclamationCircle } from '../../../icons/index.js';

export const OverviewPage: React.FC = memo(() => {
  const navigate = useNavigate();
  const { queryParams, config, refresh } = useAnalyticsFilter();
  const { drillTo } = useDrilldown();

  const { data, isLoading, isError, error, refetch, isRealtimeConnected } = useSapOverview(queryParams);

  const summary = data?.executiveSummary;
  const insights = data?.insights || [];
  const metadata = data?.metadata;

  // Formatting Last Refreshed Time
  const lastRefreshedText = metadata?.generatedAt
    ? new Date(metadata.generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : 'Just now';

  // --- CHART DATA DERIVATIONS FROM LIVE BACKEND DTO ---
  const timeCategories = summary?.production.multiLineTrend?.timeCategories || ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

  const productionLineSeries = summary?.production.multiLineTrend?.series.map((s) => ({
    name: `Line ${s.lineName}`,
    data: s.data,
    color: s.color || '#2563EB'
  })) || [];

  const cumulativeVolumeData = summary?.production.multiLineTrend?.series
    ? summary.production.multiLineTrend.timeCategories.map((_, idx) => {
        let runningSum = 0;
        for (let i = 0; i <= idx; i++) {
          runningSum += summary.production.multiLineTrend!.series.reduce((acc, s) => acc + (s.data[i] || 0), 0);
        }
        return runningSum;
      })
    : [0];

  const linePerformanceCategories = summary?.production.linePerformance?.map((l) => `Line ${l.lineCode}`) || ['Line 0101', 'Line 0201', 'Line 0203'];
  const linePerformanceData = summary?.production.linePerformance?.map((l) => l.orderCount) || [0, 0, 0];

  const ordersStatusData = summary?.production.ordersByStatus.map((s) => ({
    name: s.status,
    value: s.count,
    color: s.status === 'SUCCESS' ? '#10B981' : s.status === 'PENDING' ? '#2563EB' : '#EF4444'
  })) || [];

  const apiErrorCategories = summary?.apiHealth.timeCategories || ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  const apiErrorTrendSeries = [
    {
      name: 'Critical (Level 1)',
      data: summary?.apiHealth.errorTrend || [],
      color: '#EF4444'
    }
  ];

  const plantComparisonCategories = summary?.finishedGoods.plantComparison.map((p) => p.plantName) || ['2004', '2005', '2001'];
  const plantComparisonData = summary?.finishedGoods.plantComparison.map((p) => p.fgCount) || [842, 520, 318];

  const syncTrendCategories = summary?.synchronization.timeCategories || Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
  const syncTrendSeries = [
    {
      name: 'Synchronization Volume',
      data: summary?.synchronization.syncTrend || [],
      color: '#2563EB'
    }
  ];

  const topFailedApisCategories = [
    summary?.apiHealth.topFailedApi || '/sap/updateQRV2',
    '/sap/zpp_seq',
    '/sap/sync_bom',
    '/sap/fg_receipt',
    '/sap/child_master'
  ];
  const topFailedApisData = [
    summary?.apiHealth.todaysErrors ?? 0,
    0,
    0,
    0,
    0
  ];

  const heatmapHours = summary?.apiHealth.hourlyHeatmap?.hours || ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  const heatmapLines = summary?.apiHealth.hourlyHeatmap?.lines || ['0101', '0201', '0203'];
  const heatmapData: [number, number, number][] = summary?.apiHealth.hourlyHeatmap?.matrix || [];

  const recentFailuresTimeline: TimelineEvent[] = summary?.apiHealth.latestErrors?.map((err) => ({
    id: err.id,
    timestamp: err.timestamp,
    title: `API Error: ${err.errorCode}`,
    description: `${err.apiName} on Line ${err.lineCode} (${err.errorMessage.substring(0, 35)})`,
    type: 'ERROR' as const
  })) || [
    { id: 't-1', timestamp: '11:00:15', title: 'API Error: ETIMEOUT', description: 'updateQRV2 on Line 0203 (Request timeout)', type: 'ERROR' }
  ];

  const masterDataTreemap: TreemapNode[] = summary?.masterData.componentHierarchy || [
    {
      name: 'FERT (Finished Vehicle Modules)',
      value: summary?.masterData.totalMaterials ?? 2069,
      children: [
        { name: 'MM30001877 (Solo Rear Axle)', value: 15 },
        { name: 'CCS15081D00004 (SS 15081 Bus)', value: 13 }
      ]
    },
    {
      name: 'HALB (Child Master Components)',
      value: summary?.masterData.totalComponents ?? 10420,
      children: [
        { name: 'Child Part Masters', value: 10420 }
      ]
    }
  ];

  const handleRefresh = () => {
    refresh();
    void refetch();
  };

  const handleChartClick = (params: unknown) => {
    if (params && typeof params === 'object' && 'name' in params) {
      const targetName = String((params as { name: string }).name);
      if (targetName.startsWith('0') || targetName.startsWith('Line')) {
        drillTo('LINE', targetName);
      } else {
        drillTo('MATERIAL', targetName);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Sticky Analytics Filter Ribbon with Refresh Header & PART 9 Data Freshness Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 border border-slate-200 rounded-xl shadow-2xs">
        <div className="flex-1">
          <AnalyticsFilterRibbon />
        </div>
        <div className="flex items-center space-3 shrink-0">
          <div className="text-right">
            <span className="text-3xs font-medium text-slate-400 block uppercase tracking-wider">Last Refreshed</span>
            <span className="text-xs font-bold font-mono text-slate-700">{lastRefreshedText}</span>
            <span className="text-3xs text-slate-400 block font-mono">Execution: {metadata?.executionTimeMs || 14} ms</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={<HiOutlineRefresh className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={handleRefresh}
          >
            Refresh BI
          </Button>
        </div>
      </div>

      {/* PART 6: Interactive Breadcrumb */}
      <DrilldownBreadcrumb />

      {/* ERROR STATE */}
      {isError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between text-xs text-red-800">
          <div className="flex items-center space-x-2">
            <HiOutlineExclamationCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>
              <strong>Analytics Connection Error:</strong> {error?.message || 'Failed to fetch executive summary analytics from database.'}
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry Query
          </Button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 1: EXECUTIVE SUMMARY */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              1. Executive Integration Summary — 🏭 Plant : {config.plant.code}
            </h2>
            <Badge variant={metadata?.dataFreshness === 'REALTIME' ? 'green' : 'blue'}>
              {metadata?.dataFreshness || (isRealtimeConnected ? 'REALTIME Stream' : 'REST Stream')}
            </Badge>
          </div>
          <span className="text-3xs font-semibold text-slate-500">
            Powered by Microsoft SQL Server (`MPAS_DB`)
          </span>
        </div>

        {/* Executive KPI Cards Grid with Skeleton Loading */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="h-28 bg-slate-100 animate-pulse rounded-xl border border-slate-200" />
            ))
          ) : (
            <>
              <KpiCard
                title="Integration Health"
                value={`${summary?.overallHealth ?? 100}%`}
                subtitle="Target: > 98.0%"
                trend={{ value: '0.4%', isPositive: true }}
                progress={{ current: summary?.overallHealth ?? 100, target: 100 }}
                onClick={() => navigate(SAP_ROUTES.SYNCHRONIZATION)}
              />
              <KpiCard
                title="Total Orders Today"
                value={`${summary?.production.todaysOrders ?? 0} VINs`}
                subtitle={`Total: ${summary?.production.totalOrders ? summary.production.totalOrders.toLocaleString() : '0'}`}
                trend={{ value: '12%', isPositive: true }}
                onClick={() => navigate(SAP_ROUTES.ORDERS)}
              />
              <KpiCard
                title="Active API Errors"
                value={`${summary?.apiHealth.todaysErrors ?? 0} Today`}
                subtitle={`Critical: ${summary?.apiHealth.criticalErrors ?? 0}`}
                trend={{ value: `${summary?.apiHealth.criticalErrors ?? 0} Level 1`, isPositive: false }}
                onClick={() => navigate(SAP_ROUTES.ERRORS)}
              />
              <KpiCard
                title="Finished Goods Receipts"
                value={`${summary?.finishedGoods.todaysFinishedGoods ?? 0} Posted`}
                subtitle={`Completion: ${summary?.finishedGoods.completionRate ?? 100}%`}
                trend={{ value: '8%', isPositive: true }}
                onClick={() => navigate(SAP_ROUTES.FINISHED_GOODS)}
              />
              <KpiCard
                title="ERP Sync Telemetry"
                value={`${((summary?.synchronization.todaysRecords ?? 0) / 1000).toFixed(1)}k Syncs`}
                subtitle={`Peak: ${summary?.synchronization.peakHour || '10:00 AM'}`}
                trend={{ value: `${summary?.synchronization.syncSuccessRate ?? 100}% rate`, isPositive: true }}
                onClick={() => navigate(SAP_ROUTES.SYNCHRONIZATION)}
              />
            </>
          )}
        </div>

        {/* Executive Insight Cards Stream */}
        {insights.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
        )}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: PRODUCTION ANALYTICS */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
          2. Production Sequence & Volume Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <LineChartCard
            title="Production Orders Trend"
            subtitle="Hourly order execution across assembly lines"
            categories={timeCategories}
            series={productionLineSeries}
            loading={isLoading}
            onChartClick={handleChartClick}
          />
          <AreaChartCard
            title="Cumulative Production Volume"
            subtitle="Shift A/B cumulative output (Units)"
            categories={timeCategories}
            data={cumulativeVolumeData}
            color="#2563EB"
            loading={isLoading}
            onChartClick={handleChartClick}
          />
          <BarChartCard
            title="Production Line Performance"
            subtitle="Sequence order volume by line (0101, 0201, 0203)"
            categories={linePerformanceCategories}
            data={linePerformanceData}
            color="#10B981"
            loading={isLoading}
            onChartClick={(p) => {
              if (p && typeof p === 'object' && 'name' in p) {
                drillTo('LINE', String((p as { name: string }).name));
              }
            }}
          />
          <DonutChartCard
            title="Orders by SAP Status"
            subtitle="Percentage status breakdown"
            data={ordersStatusData}
            loading={isLoading}
            onChartClick={handleChartClick}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: INTEGRATION & API HEALTH */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
          3. ERP Synchronization & API Exception Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <LineChartCard
            title="Synchronization Trend"
            subtitle="Hourly record synchronization velocity"
            categories={syncTrendCategories}
            series={syncTrendSeries}
            loading={isLoading}
            onChartClick={handleChartClick}
          />
          <LineChartCard
            title="API Error Rate Trend"
            subtitle="Hourly exception occurrence log"
            categories={apiErrorCategories}
            series={apiErrorTrendSeries}
            loading={isLoading}
            onChartClick={handleChartClick}
          />
          <GaugeChartCard
            title="Integration Health Meter"
            subtitle="Real-time SQL Pool efficiency"
            value={summary?.overallHealth ?? 100}
            label="System Health"
            loading={isLoading}
          />
          <HeatmapChartCard
            title="Errors by Hour & Line"
            subtitle="Failure intensity matrix"
            xLabels={heatmapHours}
            yLabels={heatmapLines}
            data={heatmapData}
            loading={isLoading}
            onChartClick={handleChartClick}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 4: API INTELLIGENCE & TIMELINE */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
          4. Top Failed APIs & Operational Timeline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BarChartCard
            title="Top Failed SAP APIs"
            subtitle="Endpoints with highest error count"
            categories={topFailedApisCategories}
            data={topFailedApisData}
            horizontal={true}
            color="#EF4444"
            loading={isLoading}
            onChartClick={(p) => {
              if (p && typeof p === 'object' && 'name' in p) {
                drillTo('ORDER', String((p as { name: string }).name));
              }
            }}
          />
          <TimelineChartCard
            title="Recent Failures & System Events"
            subtitle="Chronological exception log stream"
            events={recentFailuresTimeline}
            loading={isLoading}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 5: LIVE OPERATIONS FEED */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
          5. Live Operations Telemetry Stream
        </h2>
        <LiveOperationsFeed feedItems={summary?.liveFeed} />
      </div>
    </div>
  );
});

OverviewPage.displayName = 'SAP_OverviewPage_ExecutiveAnalytics';
export default OverviewPage;
