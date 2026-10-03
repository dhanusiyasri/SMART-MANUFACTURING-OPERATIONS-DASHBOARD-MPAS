import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

export interface VolumeSeries {
  statusName: string; // Success, Failure, Skipped, Pending
  data: number[];
  color: string;
}

interface SyncVolumeStackedChartProps {
  categories: string[];
  series: VolumeSeries[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const SyncVolumeStackedChart: React.FC<SyncVolumeStackedChartProps> = memo(({
  categories,
  series,
  loading = false,
  error = null,
  height = '280px',
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
    grid: { left: '3%', right: '4%', bottom: '15%', top: '8%', containLabel: true },
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      name: 'Records Volume',
      nameTextStyle: { color: '#64748B', fontSize: 10 },
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    series: series.map((s) => ({
      name: s.statusName,
      type: 'bar',
      stack: 'syncVolume',
      data: s.data,
      itemStyle: { color: s.color }
    }))
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="3. Processing Volume Distribution"
      subtitle="Breakdown by Status: Success, Failure, Skipped, & Pending"
      tooltipText="Stacked column chart breaking down sync batch outcomes per shift"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

SyncVolumeStackedChart.displayName = 'SyncVolumeStackedChart';
