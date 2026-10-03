import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

interface OrdersByLineChartProps {
  lines: string[];
  orderCounts: number[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const OrdersByLineChart: React.FC<OrdersByLineChartProps> = memo(({
  lines,
  orderCounts,
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
      data: lines,
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    series: [
      {
        name: 'Orders Count',
        type: 'bar',
        data: orderCounts,
        barWidth: '50%',
        itemStyle: {
          color: '#2563EB',
          borderRadius: [0, 4, 4, 0]
        }
      }
    ]
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="2. Orders by Production Line"
      subtitle="Business Question: Which production line is processing the most orders?"
      tooltipText="Identifies bottleneck lines and workload distribution across assembly lines"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

OrdersByLineChart.displayName = 'OrdersByLineChart';
