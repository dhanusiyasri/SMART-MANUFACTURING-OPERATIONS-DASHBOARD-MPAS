import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from './AnalyticsCard.js';

export interface StackedSeries {
  name: string;
  data: number[];
  color: string;
}

interface StackedBarChartCardProps {
  title: string;
  subtitle?: string;
  categories: string[];
  series: StackedSeries[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const StackedBarChartCard: React.FC<StackedBarChartCardProps> = memo(({
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
      textStyle: { color: '#F8FAFC', fontSize: 11 },
      axisPointer: { type: 'shadow' }
    },
    legend: { bottom: '0%', textStyle: { color: '#64748B', fontSize: 10 } },
    grid: { left: '3%', right: '4%', bottom: '12%', top: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    series: series.map((s: StackedSeries) => ({
      name: s.name,
      type: 'bar',
      stack: 'total',
      data: s.data,
      itemStyle: { color: s.color }
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
      <ReactECharts option={option} style={{ height, width: '100%' }} onEvents={onEvents} />
    </AnalyticsCard>
  );
});

StackedBarChartCard.displayName = 'StackedBarChartCard';
