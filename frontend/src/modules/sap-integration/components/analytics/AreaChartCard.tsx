import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { AnalyticsCard } from './AnalyticsCard.js';

interface AreaChartCardProps {
  title: string;
  subtitle?: string;
  categories: string[];
  data: number[];
  color?: string;
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const AreaChartCard: React.FC<AreaChartCardProps> = memo(({
  title,
  subtitle,
  categories,
  data,
  color = '#1E40AF',
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
    series: [
      {
        type: 'line',
        smooth: true,
        data,
        itemStyle: { color },
        lineStyle: { width: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: color },
            { offset: 1, color: 'rgba(255, 255, 255, 0.05)' }
          ])
        }
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
      <ReactECharts option={option} style={{ height, width: '100%' }} onEvents={onEvents} />
    </AnalyticsCard>
  );
});

AreaChartCard.displayName = 'AreaChartCard';
