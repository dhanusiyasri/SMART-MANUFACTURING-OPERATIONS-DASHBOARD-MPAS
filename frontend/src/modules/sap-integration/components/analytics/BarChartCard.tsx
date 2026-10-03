import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from './AnalyticsCard.js';

interface BarChartCardProps {
  title: string;
  subtitle?: string;
  categories: string[];
  data: number[];
  horizontal?: boolean;
  color?: string;
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const BarChartCard: React.FC<BarChartCardProps> = memo(({
  title,
  subtitle,
  categories,
  data,
  horizontal = false,
  color = '#2563EB',
  loading = false,
  error = null,
  height = '240px',
  onChartClick
}) => {
  const categoryAxis = {
    type: 'category',
    data: categories,
    axisLine: { lineStyle: { color: '#CBD5E1' } },
    axisLabel: { color: '#64748B', fontSize: 10 }
  };

  const valueAxis = {
    type: 'value',
    splitLine: { lineStyle: { color: '#F1F5F9' } },
    axisLabel: { color: '#64748B', fontSize: 10 }
  };

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#0F172A',
      textStyle: { color: '#F8FAFC', fontSize: 11 }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '12%', containLabel: true },
    xAxis: horizontal ? valueAxis : categoryAxis,
    yAxis: horizontal ? categoryAxis : valueAxis,
    series: [
      {
        type: 'bar',
        data,
        barWidth: '45%',
        itemStyle: { color, borderRadius: [4, 4, 0, 0] }
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

BarChartCard.displayName = 'BarChartCard';
