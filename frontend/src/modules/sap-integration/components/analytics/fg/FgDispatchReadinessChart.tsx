import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

export interface DispatchSeries {
  statusName: string; // Completed, Pending, In Progress
  data: number[];
  color: string;
}

interface FgDispatchReadinessChartProps {
  yardBays: string[]; // Bay A, Bay B, Bay C, Bay D
  series: DispatchSeries[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const FgDispatchReadinessChart: React.FC<FgDispatchReadinessChartProps> = memo(({
  yardBays,
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
      data: yardBays,
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      name: 'VIN Units',
      nameTextStyle: { color: '#64748B', fontSize: 10 },
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    series: series.map((s) => ({
      name: s.statusName,
      type: 'bar',
      stack: 'dispatch',
      data: s.data,
      itemStyle: { color: s.color }
    }))
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="8. Yard Dispatch Readiness Status"
      subtitle='Question Answered: "Which finished goods are ready for dispatch?"'
      tooltipText="Stacked bar visual tracking Completed gate exits vs Pending holding bay allocations"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

FgDispatchReadinessChart.displayName = 'FgDispatchReadinessChart';
