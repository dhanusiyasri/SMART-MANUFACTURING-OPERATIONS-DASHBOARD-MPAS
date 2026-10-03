import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

interface ApiFailureHeatmapProps {
  hours: string[]; // 06h - 22h
  lines: string[]; // Line 1 - Line 5
  data: [number, number, number][]; // [hourIdx, lineIdx, failureCount]
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const ApiFailureHeatmap: React.FC<ApiFailureHeatmapProps> = memo(({
  hours,
  lines,
  data,
  loading = false,
  error = null,
  height = '280px',
  onChartClick
}) => {
  const maxCount = Math.max(...data.map((d) => d[2]), 20);

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
      data: lines,
      splitArea: { show: true },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    visualMap: {
      min: 0,
      max: maxCount,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%',
      textStyle: { color: '#64748B', fontSize: 9 },
      inRange: { color: ['#F8FAFC', '#FEE2E2', '#EF4444', '#7F1D1D'] }
    },
    series: [
      {
        name: 'Failure Intensity',
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
      title="4. Failure Heatmap Matrix"
      subtitle='Question Answered: "Which line experiences failures and when?"'
      tooltipText="Identifies peak API exception hours per manufacturing line"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

ApiFailureHeatmap.displayName = 'ApiFailureHeatmap';
