import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

interface CriticalBomComponentsChartProps {
  components: string[];
  dependencyCounts: number[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const CriticalBomComponentsChart: React.FC<CriticalBomComponentsChartProps> = memo(({
  components,
  dependencyCounts,
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
      name: 'Order Dependency Count',
      nameTextStyle: { color: '#64748B', fontSize: 10 },
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    yAxis: {
      type: 'category',
      data: components,
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    series: [
      {
        name: 'BOM Dependency Count',
        type: 'bar',
        data: dependencyCounts,
        barWidth: '50%',
        itemStyle: {
          color: '#F59E0B',
          borderRadius: [0, 4, 4, 0]
        }
      }
    ]
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="Top Critical BOM Components"
      subtitle="Highest sequence order dependency in SAP_CBN_MASTER"
      tooltipText="Identifies key child materials required by sequence orders"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

CriticalBomComponentsChart.displayName = 'CriticalBomComponentsChart';
