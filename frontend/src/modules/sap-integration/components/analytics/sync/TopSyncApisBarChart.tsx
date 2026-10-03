import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

interface TopSyncApisBarChartProps {
  apiNames: string[];
  volumeCounts: number[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const TopSyncApisBarChart: React.FC<TopSyncApisBarChartProps> = memo(({
  apiNames,
  volumeCounts,
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
        name: 'Record Volume',
        type: 'bar',
        data: volumeCounts,
        barWidth: '50%',
        itemStyle: {
          color: '#10B981',
          borderRadius: [0, 4, 4, 0]
        }
      }
    ]
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="2. Top Synchronization APIs by Volume"
      subtitle='Question Answered: "Which APIs process the largest data volume?"'
      tooltipText="Ranks SAP ERP sync interfaces by total processed record volume"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

TopSyncApisBarChart.displayName = 'TopSyncApisBarChart';
