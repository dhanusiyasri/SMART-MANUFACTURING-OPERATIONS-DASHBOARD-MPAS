import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from './AnalyticsCard.js';

export interface TreemapNode {
  name: string;
  value: number;
  children?: TreemapNode[];
}

interface TreemapChartCardProps {
  title: string;
  subtitle?: string;
  data: TreemapNode[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const TreemapChartCard: React.FC<TreemapChartCardProps> = memo(({
  title,
  subtitle,
  data,
  loading = false,
  error = null,
  height = '240px',
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

  const onEvents = onChartClick
    ? {
        click: (params: unknown) => {
          onChartClick(params);
        }
      }
    : undefined;

  return (
    <AnalyticsCard title={title} subtitle={subtitle} loading={loading} error={error}>
      <div className="w-full relative min-h-[240px]">
        <ReactECharts
          option={option}
          notMerge={true}
          lazyUpdate={true}
          opts={{ renderer: 'canvas' }}
          style={{ height, width: '100%' }}
          onEvents={onEvents}
        />
      </div>
    </AnalyticsCard>
  );
});

TreemapChartCard.displayName = 'TreemapChartCard';
