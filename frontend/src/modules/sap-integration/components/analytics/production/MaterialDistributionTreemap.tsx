import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

export interface MaterialTreemapItem {
  name: string;
  value: number;
}

interface MaterialDistributionTreemapProps {
  materials: MaterialTreemapItem[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const MaterialDistributionTreemap: React.FC<MaterialDistributionTreemapProps> = memo(({
  materials,
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
        data: materials,
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
      title="3. Top Manufactured Materials SKU"
      subtitle="Business Question: Which materials are produced most frequently?"
      tooltipText="Ranks top vehicle & component material codes in SAP_ZPP_SEQ_PLAN by production volume"
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

MaterialDistributionTreemap.displayName = 'MaterialDistributionTreemap';
