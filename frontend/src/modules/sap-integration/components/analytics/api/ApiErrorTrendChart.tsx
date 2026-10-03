import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

export interface ApiTrendSeries {
  levelName: string;
  data: number[];
  color?: string;
}

interface ApiErrorTrendChartProps {
  timeCategories: string[];
  series: ApiTrendSeries[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const ApiErrorTrendChart: React.FC<ApiErrorTrendChartProps> = memo(({
  timeCategories,
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
      textStyle: { color: '#F8FAFC', fontSize: 11 }
    },
    legend: { bottom: '0%', textStyle: { color: '#64748B', fontSize: 10 } },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '8%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: timeCategories,
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      name: 'Failure Count',
      nameTextStyle: { color: '#64748B', fontSize: 10 },
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    series: series.map((s) => ({
      name: s.levelName,
      type: 'line',
      smooth: true,
      data: s.data,
      itemStyle: { color: s.color || '#EF4444' },
      lineStyle: { width: 2.5 }
    }))
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="1. Error Occurrence Trend"
      subtitle='Question Answered: "When are failures occurring?"'
      tooltipText="Monitors temporal failure spikes across Shift A, B, and C from SAP_API_ERROR_LOG"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

ApiErrorTrendChart.displayName = 'ApiErrorTrendChart';
