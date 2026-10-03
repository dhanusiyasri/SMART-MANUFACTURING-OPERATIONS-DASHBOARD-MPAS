import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

interface TopFailedApisChartProps {
  apiNames: string[];
  failureCounts: number[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const TopFailedApisChart: React.FC<TopFailedApisChartProps> = memo(({
  apiNames,
  failureCounts,
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
    grid: { left: '3%', right: '6%', bottom: '3%', top: '8%', containLabel: true },
    xAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    yAxis: {
      type: 'category',
      data: apiNames,
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    series: [
      {
        name: 'Failure Count',
        type: 'bar',
        data: failureCounts,
        barWidth: '50%',
        itemStyle: {
          color: '#DC2626',
          borderRadius: [0, 4, 4, 0]
        }
      }
    ]
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="2. Top Failed SAP Endpoints"
      subtitle='Question Answered: "Which APIs fail the most?"'
      tooltipText="Ranks SAP integration endpoints by absolute error log volume"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

TopFailedApisChart.displayName = 'TopFailedApisChart';
