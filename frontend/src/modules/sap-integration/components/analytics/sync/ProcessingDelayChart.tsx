import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

interface ProcessingDelayChartProps {
  apiNames: string[];
  avgDelayMs: number[];
  maxDelayMs: number[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const ProcessingDelayChart: React.FC<ProcessingDelayChartProps> = memo(({
  apiNames,
  avgDelayMs,
  maxDelayMs,
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
      data: apiNames,
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      name: 'Delay (ms)',
      nameTextStyle: { color: '#64748B', fontSize: 10 },
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    series: [
      {
        name: 'Average Delay (ms)',
        type: 'bar',
        data: avgDelayMs,
        itemStyle: { color: '#3B82F6', borderRadius: [4, 4, 0, 0] }
      },
      {
        name: 'Max Delay (ms)',
        type: 'line',
        data: maxDelayMs,
        itemStyle: { color: '#EF4444' },
        lineStyle: { width: 2, type: 'dashed' }
      }
    ]
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="6. Processing Delay & Latency Analysis"
      subtitle='Question Answered: "Which APIs experience abnormal delays?"'
      tooltipText="Compares average vs peak latency per SAP sync interface to detect bottleneck queues"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

ProcessingDelayChart.displayName = 'ProcessingDelayChart';
