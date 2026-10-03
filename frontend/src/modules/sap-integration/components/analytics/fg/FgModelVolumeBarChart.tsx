import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

interface FgModelVolumeBarChartProps {
  models: string[];
  volumes: number[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const FgModelVolumeBarChart: React.FC<FgModelVolumeBarChartProps> = memo(({
  models,
  volumes,
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
      data: models,
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    series: [
      {
        name: 'VIN Units Volume',
        type: 'bar',
        data: volumes,
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
      title="Finished Goods Volume by Vehicle Family"
      subtitle="Production completion ratio across AVTR, BOSS, Captain, and LCV series"
      tooltipText="Ranks vehicle platforms by finished goods inventory receipt volume"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

FgModelVolumeBarChart.displayName = 'FgModelVolumeBarChart';
