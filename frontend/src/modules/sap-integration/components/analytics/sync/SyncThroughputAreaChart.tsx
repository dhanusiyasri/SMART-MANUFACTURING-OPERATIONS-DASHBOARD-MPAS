import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { AnalyticsCard } from '../AnalyticsCard.js';

interface SyncThroughputAreaChartProps {
  timeCategories: string[];
  recordsData: number[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const SyncThroughputAreaChart: React.FC<SyncThroughputAreaChartProps> = memo(({
  timeCategories,
  recordsData,
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
    grid: { left: '3%', right: '4%', bottom: '3%', top: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: timeCategories,
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
    series: [
      {
        name: 'Synchronized Records',
        type: 'line',
        smooth: true,
        data: recordsData,
        itemStyle: { color: '#2563EB' },
        lineStyle: { width: 2.5 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(37, 99, 235, 0.4)' },
            { offset: 1, color: 'rgba(37, 99, 235, 0.02)' }
          ])
        }
      }
    ]
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="1. Synchronization Throughput Over Time"
      subtitle='Question Answered: "How many records are synchronized over time?"'
      tooltipText="Smooth area trend tracking SAP_DATA_FOUND_LOG record synchronization volume per hour"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

SyncThroughputAreaChart.displayName = 'SyncThroughputAreaChart';
