import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

export interface PlantSyncSeries {
  plantName: string;
  data: number[];
  color: string;
}

interface PlantSyncComparisonChartProps {
  categories: string[]; // Shift A, Shift B, Shift C
  series: PlantSyncSeries[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const PlantSyncComparisonChart: React.FC<PlantSyncComparisonChartProps> = memo(({
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
      name: s.plantName,
      type: 'bar',
      data: s.data,
      itemStyle: { color: s.color, borderRadius: [4, 4, 0, 0] }
    }))
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="6. Synchronization Volume by Production Line"
      subtitle='Question Answered: "Which production line processes the most records?"'
      tooltipText="Grouped bar visual comparing record synchronization throughput across Lines 0101, 0201, and 0203"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

PlantSyncComparisonChart.displayName = 'PlantSyncComparisonChart';
