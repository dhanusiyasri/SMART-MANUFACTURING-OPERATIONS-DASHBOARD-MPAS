import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from './AnalyticsCard.js';

export interface LineChartSeries {
  name: string;
  data: number[];
  color?: string;
}

interface LineChartCardProps {
  title: string;
  subtitle?: string;
  categories: string[];
  series: LineChartSeries[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const LineChartCard: React.FC<LineChartCardProps> = memo(({
  title,
  subtitle,
  categories,
  series,
  loading = false,
  error = null,
  height = '240px',
  onChartClick
}) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#0F172A',
      textStyle: { color: '#F8FAFC', fontSize: 11 }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: categories,
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    series: series.map((s) => ({
      name: s.name,
      type: 'line',
      smooth: true,
      data: s.data,
      itemStyle: { color: s.color || '#2563EB' },
      lineStyle: { width: 2.5 }
    }))
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

LineChartCard.displayName = 'LineChartCard';
