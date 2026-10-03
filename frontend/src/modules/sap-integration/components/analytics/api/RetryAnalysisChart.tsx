import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

export interface RetrySeries {
  retryLabel: string; // e.g. 1 Retry, 2 Retries, 3+ Retries
  data: number[];
  color: string;
}

interface RetryAnalysisChartProps {
  apiEndpoints: string[];
  series: RetrySeries[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const RetryAnalysisChart: React.FC<RetryAnalysisChartProps> = memo(({
  apiEndpoints,
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
      data: apiEndpoints,
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      name: 'Retry Attempts',
      nameTextStyle: { color: '#64748B', fontSize: 10 },
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    series: series.map((s) => ({
      name: s.retryLabel,
      type: 'bar',
      stack: 'retries',
      data: s.data,
      itemStyle: { color: s.color }
    }))
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="6. Retry Count Analysis per API"
      subtitle='Question Answered: "Which APIs require multiple retries?"'
      tooltipText="Stacked column visual displaying 1st attempt vs multi-attempt automatic retries"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

RetryAnalysisChart.displayName = 'RetryAnalysisChart';
