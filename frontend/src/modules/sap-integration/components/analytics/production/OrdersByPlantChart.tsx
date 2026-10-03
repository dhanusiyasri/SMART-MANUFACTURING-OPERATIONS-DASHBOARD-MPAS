import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

interface OrdersByPlantChartProps {
  plants?: string[];
  orderCounts?: number[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const OrdersByPlantChart: React.FC<OrdersByPlantChartProps> = memo(({
  loading = false,
  error = null,
  height = '280px',
  onChartClick
}) => {
  const lineCategories = ['Line 0101', 'Line 0201', 'Line 0203'];
  const lineData = [435, 4566, 5425];

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#0F172A',
      textStyle: { color: '#F8FAFC', fontSize: 11 },
      axisPointer: { type: 'shadow' }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      data: lineCategories,
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 10, fontWeight: 'bold' }
    },
    yAxis: {
      type: 'value',
      name: 'Orders Count',
      nameTextStyle: { color: '#64748B', fontSize: 10 },
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    series: [
      {
        name: 'Sequence Order Volume',
        type: 'bar',
        data: lineData,
        barWidth: '35%',
        itemStyle: {
          color: '#10B981',
          borderRadius: [4, 4, 0, 0]
        }
      }
    ]
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="3. Production Line Utilization & Workload"
      subtitle="Workload distribution across Lines 0101, 0201, 0203 in Plant 2004"
      tooltipText="Compares sequence plan order throughput across assembly lines 0101, 0201, and 0203 in Plant 2004"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

OrdersByPlantChart.displayName = 'OrdersByPlantChart';
