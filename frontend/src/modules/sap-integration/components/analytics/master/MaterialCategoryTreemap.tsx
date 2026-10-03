import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';
import { TreemapNode } from '../TreemapChartCard.js';

interface MaterialCategoryTreemapProps {
  data: TreemapNode[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const MaterialCategoryTreemap: React.FC<MaterialCategoryTreemapProps> = memo(({
  data,
  loading = false,
  error = null,
  height = '280px',
  onChartClick
}) => {
  const option = {
    tooltip: {
      backgroundColor: '#0F172A',
      textStyle: { color: '#F8FAFC', fontSize: 11 }
    },
    series: [
      {
        type: 'treemap',
        data,
        roam: false,
        nodeClick: false,
        breadcrumb: { show: false },
        label: { show: true, fontSize: 10, color: '#FFFFFF', fontWeight: 'bold' },
        itemStyle: { borderColor: '#FFFFFF', borderWidth: 1, gapWidth: 1 }
      }
    ]
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="SAP Material Master Hierarchy (FERT / HALB / ROH)"
      subtitle="Hierarchy breakdown across SAP_CHILD_MASTER & SAP_CBN_MASTER"
      tooltipText="Ranks material types by active SKU volume and BOM dependency count"
      loading={loading}
      error={error}
    >
      <div className="w-full relative min-h-[280px]">
        <ReactECharts
          option={option}
          notMerge={true}
          lazyUpdate={true}
          opts={{ renderer: 'canvas' }}
          onEvents={onEvents}
          style={{ height, width: '100%' }}
        />
      </div>
    </AnalyticsCard>
  );
});

MaterialCategoryTreemap.displayName = 'MaterialCategoryTreemap';
