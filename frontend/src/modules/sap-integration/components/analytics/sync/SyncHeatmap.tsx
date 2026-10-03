import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

interface SyncHeatmapProps {
  hours: string[]; // 06:00 - 22:00
  apiNames: string[]; // updateAlarmHistory, sync_bom, etc.
  data: [number, number, number][]; // [hourIdx, apiIdx, volume]
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const SyncHeatmap: React.FC<SyncHeatmapProps> = memo(({
  hours,
  apiNames,
  data,
  loading = false,
  error = null,
  height = '280px',
  onChartClick
}) => {
  const maxVolume = Math.max(...data.map((d) => d[2]), 5000);

  const option = {
    tooltip: {
      position: 'top',
      backgroundColor: '#0F172A',
      textStyle: { color: '#F8FAFC', fontSize: 10 }
    },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '8%', containLabel: true },
    xAxis: {
      type: 'category',
      data: hours,
      splitArea: { show: true },
      axisLabel: { color: '#64748B', fontSize: 9 }
    },
    yAxis: {
      type: 'category',
      data: apiNames,
      splitArea: { show: true },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    visualMap: {
      min: 0,
      max: maxVolume,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%',
      textStyle: { color: '#64748B', fontSize: 9 },
      inRange: { color: ['#F8FAFC', '#D1FAE5', '#10B981', '#065F46'] }
    },
    series: [
      {
        name: 'Sync Workload Density',
        type: 'heatmap',
        data,
        label: { show: false },
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' }
        }
      }
    ]
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="4. Synchronization Workload Heatmap"
      subtitle='Question Answered: "Which APIs are busiest during the day?"'
      tooltipText="2D workload density matrix mapping sync records volume across API endpoints & hours"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

SyncHeatmap.displayName = 'SyncHeatmap';
