import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from './AnalyticsCard.js';

export interface PieDataItem {
  name: string;
  value: number;
  color?: string;
}

interface DonutChartCardProps {
  title: string;
  subtitle?: string;
  data: PieDataItem[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const DonutChartCard: React.FC<DonutChartCardProps> = memo(({
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
      trigger: 'item',
      backgroundColor: '#0F172A',
      textStyle: { color: '#F8FAFC', fontSize: 11 }
    },
    legend: {
      orient: 'vertical',
      right: '2%',
      top: 'middle',
      textStyle: { color: '#64748B', fontSize: 10 }
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: { label: { show: true, fontSize: 12, fontWeight: 'bold' } },
        data: data.map((item) => ({
          name: item.name,
          value: item.value,
          itemStyle: item.color ? { color: item.color } : undefined
        }))
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

DonutChartCard.displayName = 'DonutChartCard';
