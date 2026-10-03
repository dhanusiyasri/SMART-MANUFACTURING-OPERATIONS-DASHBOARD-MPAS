import React, { memo, useMemo } from 'react';
import { useProductionAnalytics } from '../../../hooks/useProductionAnalytics.js';
import { useDrilldown } from '../../../../../contexts/DrilldownContext.js';
import { DrilldownBreadcrumb } from '../DrilldownBreadcrumb.js';
import { ProductionTrendChart, ProductionTrendSeries } from './ProductionTrendChart.js';
import { OrdersByLineChart } from './OrdersByLineChart.js';
import { MaterialDistributionTreemap, MaterialTreemapItem } from './MaterialDistributionTreemap.js';
import { StatusDistributionDonut, StatusDonutItem } from './StatusDistributionDonut.js';
import { InsightCard } from '../InsightCard.js';
import { Button } from '../../../../../components/common/Button.js';
import { Badge } from '../../../../../components/common/Badge.js';
import { HiOutlineRefresh, HiOutlineExclamationCircle } from '../../../../../icons/index.js';

interface ProductionAnalyticsSectionProps {
  loading?: boolean;
  error?: Error | null;
  filters?: Record<string, string>;
}

export const ProductionAnalyticsSection: React.FC<ProductionAnalyticsSectionProps> = memo(({
  filters
}) => {
  const { drillTo, selectedLine, selectedMaterial, selectedOrder } = useDrilldown();

  // Combine global filter params with active drilldown state
  const combinedFilters = useMemo(() => {
    const params: Record<string, string> = { ...(filters || {}) };
    if (selectedLine) {
      params.lineCode = selectedLine;
    }
    if (selectedMaterial) {
      params.materialCode = selectedMaterial;
    }
    if (selectedOrder) {
      params.plnum = selectedOrder;
    }
    return params;
  }, [filters, selectedLine, selectedMaterial, selectedOrder]);

  const { data, isLoading, isError, error, refetch } = useProductionAnalytics(combinedFilters);

  const kpis = data?.kpis;
  const productionTrend = data?.productionTrend;
  const plantPerformance = data?.plantPerformance || [];
  const linePerformance = data?.linePerformance || [];
  const materialDistribution = data?.materialDistribution || [];
  const statusDistribution = data?.statusDistribution || [];
  const hourlyHeatmap = data?.hourlyHeatmap;
  const latestOrders = data?.latestOrders || [];
  const insights = data?.insights || [];
  const metadata = data?.metadata;

  // Derivations
  const timeCategories = productionTrend?.timeCategories || ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
  const trendSeries: ProductionTrendSeries[] = productionTrend?.series || [
    { lineName: '0101', data: [140, 210, 310, 420, 380, 490, 560, 510], color: '#2563EB' },
    { lineName: '0201', data: [110, 160, 230, 320, 290, 370, 440, 410], color: '#10B981' }
  ];

  const linesList = linePerformance.map((l) => l.lineCode);
  const ordersByLineData = linePerformance.map((l) => l.orderCount);

  const plantsList = plantPerformance.map((p) => p.plantName);
  const ordersByPlantData = plantPerformance.map((p) => p.orderCount);

  const materialTreemapData: MaterialTreemapItem[] = materialDistribution.map((m) => ({
    name: m.name,
    value: m.value
  }));

  const statusDonutData: StatusDonutItem[] = statusDistribution.map((s) => ({
    name: s.statusName === 'SUCCESS' ? 'Success / Synced' : s.statusName === 'PENDING' ? 'Pending Queue' : 'Failed Exception',
    value: s.count,
    color: s.color || (s.statusName === 'SUCCESS' ? '#10B981' : s.statusName === 'PENDING' ? '#2563EB' : '#EF4444')
  }));

  const heatmapHours = hourlyHeatmap?.hours || ['06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h'];
  const heatmapLines = hourlyHeatmap?.lines || ['0101', '0201', '0203'];
  const heatmapData: [number, number, number][] = hourlyHeatmap?.matrix || [
    [0, 0, 12], [1, 0, 18], [2, 0, 45], [3, 0, 32]
  ];

  const timelineEvents: ProductionEvent[] = latestOrders.slice(0, 5).map((o, idx) => ({
    id: `pe-${idx}`,
    timestamp: o.createdTime,
    orderPlnum: o.plnum,
    vinNumber: o.vinNumber,
    lineCode: o.lineCode,
    status: o.status as 'SUCCESS' | 'PENDING' | 'FAILED',
    message: `Material ${o.materialCode} (${o.materialDescription}) assigned to ${o.lineCode}`
  }));

  const topMaterialsData: TopMaterialRow[] = (data?.topMaterials && data.topMaterials.length > 0)
    ? data.topMaterials.map((m) => ({
        materialCode: m.materialCode,
        materialDescription: m.materialDescription || 'N/A',
        ordersCount: m.ordersCount,
        plantCode: m.plantCode || '2004',
        lineCode: m.lineCode || '0101',
        lineRank: m.lineRank,
        productionShare: m.productionShare,
        trendStatus: m.trendStatus || 'Not Available'
      }))
    : [
        { materialCode: 'V6162055', materialDescription: '12m LUXURA BS4 225HP CB28 EGR ENGINE wi', ordersCount: 68, plantCode: '2004', lineCode: '0101', productionShare: 15.63, lineRank: 1, trendStatus: 'Not Available' },
        { materialCode: 'CCS15094D00004', materialDescription: 'SS 15094 H PB N N1 CR SC Lx N O', ordersCount: 66, plantCode: '2004', lineCode: '0101', productionShare: 15.17, lineRank: 2, trendStatus: 'Not Available' },
        { materialCode: 'CCM13113G00007', materialDescription: '11M E2  H6 BS6 130HP NA CNG  MT  ZF S63', ordersCount: 52, plantCode: '2004', lineCode: '0101', productionShare: 11.95, lineRank: 3, trendStatus: 'Not Available' },
        { materialCode: 'CCV20114D00105', materialDescription: '222 VIKING  H6 200HP DIESEL  MT  ZF', ordersCount: 52, plantCode: '2004', lineCode: '0101', productionShare: 11.95, lineRank: 4, trendStatus: 'Not Available' },
        { materialCode: 'CDF192032C0003', materialDescription: 'F1920 660 G CBC  18.50 SHY 350L R4 32ft', ordersCount: 50, plantCode: '2004', lineCode: '0101', productionShare: 11.49, lineRank: 5, trendStatus: 'Not Available' },

        { materialCode: 'CDE191522W0013_WH', materialDescription: 'E1915 520 S HSDW 18.49 SHY 350L R4 22ft', ordersCount: 435, plantCode: '2004', lineCode: '0201', productionShare: 9.53, lineRank: 1, trendStatus: 'Not Available' },
        { materialCode: 'CCV20114D00101', materialDescription: '222 VIKING  H6 200HP DIESEL  MT  ZF', ordersCount: 308, plantCode: '2004', lineCode: '0201', productionShare: 6.75, lineRank: 2, trendStatus: 'Not Available' },
        { materialCode: 'CGE161522CC004', materialDescription: 'E1615 475 D CBC  16.10 SHY 480L R2 22ft', ordersCount: 295, plantCode: '2004', lineCode: '0201', productionShare: 6.46, lineRank: 3, trendStatus: 'Not Available' },
        { materialCode: 'CDF192032C0003', materialDescription: 'F1920 660 G CBC  18.50 SHY 350L R4 32ft', ordersCount: 290, plantCode: '2004', lineCode: '0201', productionShare: 6.35, lineRank: 4, trendStatus: 'Not Available' },
        { materialCode: 'CDF191532C0007', materialDescription: 'F1915 660 G CBC  18.50 SHY 350L R4 32ft', ordersCount: 256, plantCode: '2004', lineCode: '0201', productionShare: 5.61, lineRank: 5, trendStatus: 'Not Available' },

        { materialCode: 'MM30001499', materialDescription: 'Solo Rear Axle Manufacturing Module', ordersCount: 2075, plantCode: '2004', lineCode: '0203', productionShare: 38.25, lineRank: 1, trendStatus: 'Not Available' },
        { materialCode: 'MM30002497', materialDescription: 'Rear Axle MS13X 60S 5.57 RAR 8TG1029', ordersCount: 547, plantCode: '2004', lineCode: '0203', productionShare: 10.08, lineRank: 2, trendStatus: 'Not Available' },
        { materialCode: 'MM30001287', materialDescription: 'Solo Rear Axle Manufacturing Module', ordersCount: 517, plantCode: '2004', lineCode: '0203', productionShare: 9.53, lineRank: 3, trendStatus: 'Not Available' },
        { materialCode: 'MM30001940', materialDescription: 'RA1SOLO10TG 4.56 RAR 1670 TRACK1 40 CD 2', ordersCount: 199, plantCode: '2004', lineCode: '0203', productionShare: 3.67, lineRank: 4, trendStatus: 'Not Available' },
        { materialCode: 'MM30001777', materialDescription: 'Solo Rear Axle Manufacturing Module', ordersCount: 190, plantCode: '2004', lineCode: '0203', productionShare: 3.50, lineRank: 5, trendStatus: 'Not Available' }
      ];

  // PART 4 & 5: Interactive ECharts Cross-Filter Handlers
  const handleLineClick = (params: unknown) => {
    if (params && typeof params === 'object' && 'name' in params) {
      const lineCode = String((params as { name: string }).name);
      drillTo('LINE', lineCode);
    }
  };

  const handlePlantClick = (params: unknown) => {
    if (params && typeof params === 'object' && 'name' in params) {
      const plantCode = String((params as { name: string }).name);
      drillTo('PLANT', plantCode);
    }
  };

  const handleMaterialClick = (params: unknown) => {
    if (params && typeof params === 'object' && 'name' in params) {
      const materialCode = String((params as { name: string }).name);
      drillTo('MATERIAL', materialCode);
    }
  };

  const lastRefreshedText = metadata?.generatedAt
    ? new Date(metadata.generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : 'Just now';

  return (
    <div className="space-y-4">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 border border-slate-200 rounded-xl shadow-2xs">
        <div className="flex items-center space-x-2">
          <Badge variant={metadata?.dataFreshness === 'REALTIME' ? 'green' : 'blue'}>
            {metadata?.dataFreshness || 'REALTIME'} SQL Telemetry
          </Badge>
          <span className="text-xs font-semibold text-slate-700">
            Active Lines: <strong>{kpis?.activeLines ?? 0}</strong> | Unique SKUs: <strong>{kpis?.uniqueMaterials ?? 0}</strong>
          </span>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <div className="text-right">
            <span className="text-3xs font-medium text-slate-400 block uppercase tracking-wider">Last Refreshed</span>
            <span className="text-xs font-bold font-mono text-slate-700">{lastRefreshedText}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={<HiOutlineRefresh className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={() => refetch()}
          >
            Refresh Visuals
          </Button>
        </div>
      </div>

      {/* PART 6: Breadcrumb Component */}
      <DrilldownBreadcrumb />

      {/* ERROR STATE */}
      {isError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between text-xs text-red-800">
          <div className="flex items-center space-x-2">
            <HiOutlineExclamationCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>
              <strong>Production Analytics Query Error:</strong> {error?.message || 'Failed to query SAP_ZPP_SEQ_PLAN data from SQL Server.'}
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry Query
          </Button>
        </div>
      )}

      {/* Production Insights Row */}
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

      {/* 12-Column Responsive Power BI Visual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* Widget 1: Production Trend (Col 7) */}
        <div className="lg:col-span-7">
          <ProductionTrendChart
            timeCategories={timeCategories}
            series={trendSeries}
            loading={isLoading}
            error={error}
            onChartClick={handleLineClick}
          />
        </div>

        {/* Widget 2: Orders by Line (Col 5) */}
        <div className="lg:col-span-5">
          <OrdersByLineChart
            lines={linesList}
            orderCounts={ordersByLineData}
            loading={isLoading}
            error={error}
            onChartClick={handleLineClick}
          />
        </div>

        {/* Widget 3: Material Distribution Treemap (Col 6) */}
        <div className="lg:col-span-6">
          <MaterialDistributionTreemap
            materials={materialTreemapData}
            loading={isLoading}
            error={error}
            onChartClick={handleMaterialClick}
          />
        </div>

        {/* Widget 4: Status Distribution Donut (Col 6) */}
        <div className="lg:col-span-6">
          <StatusDistributionDonut
            data={statusDonutData}
            loading={isLoading}
            error={error}
            onChartClick={handleLineClick}
          />
        </div>
      </div>
    </div>
  );
});

ProductionAnalyticsSection.displayName = 'ProductionAnalyticsSection';
