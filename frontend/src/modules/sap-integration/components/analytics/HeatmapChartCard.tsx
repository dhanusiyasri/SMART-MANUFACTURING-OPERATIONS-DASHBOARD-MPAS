import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from './AnalyticsCard.js';

interface HeatmapChartCardProps {
  title: string;
  subtitle?: string;
  xLabels: string[]; // Hours (00:00 - 23:00)
  yLabels: string[]; // Lines (Line 1 - Line 6)
  data: [number, number, number][]; // [xIndex, yIndex, value]
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const HeatmapChartCard: React.FC<HeatmapChartCardProps> = memo(({
  title,
  subtitle,
  xLabels,
  yLabels,
  data,
  loading = false,
  error = null,
  height = '240px',
  onChartClick
}) => {
  const option = {
    tooltip: {
      position: 'top',
      backgroundColor: '#0F172A',
      textStyle: { color: '#F8FAFC', fontSize: 10 }
    },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '8%', containLabel: true },
    xAxis: {
      type: 'category',
      data: xLabels,
      splitArea: { show: true },
      axisLabel: { color: '#64748B', fontSize: 9 }
    },
    yAxis: {
      type: 'category',
      data: yLabels,
      splitArea: { show: true },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    visualMap: {
      min: 0,
      max: Math.max(...data.map((d) => d[2]), 10),
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%',
      textStyle: { color: '#64748B', fontSize: 9 },
      inRange: { color: ['#F8FAFC', '#FED7AA', '#F97316', '#DC2626'] }
    },
    series: [
      {
        name: 'API Error Intensity',
        type: 'heatmap',
        data,
        label: { show: false },
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' }
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

HeatmapChartCard.displayName = 'HeatmapChartCard';
