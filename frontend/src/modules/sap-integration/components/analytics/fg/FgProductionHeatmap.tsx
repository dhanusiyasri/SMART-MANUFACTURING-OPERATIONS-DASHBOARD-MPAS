import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

interface FgProductionHeatmapProps {
  hours: string[]; // 06h - 22h
  lines: string[]; // Line 0101, 0201, 0203
  data: [number, number, number][]; // [hourIdx, lineIdx, fgCount]
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const FgProductionHeatmap: React.FC<FgProductionHeatmapProps> = memo(({
  hours,
  lines,
  data,
  loading = false,
  error = null,
  height = '280px',
  onChartClick
}) => {
  const maxCount = Math.max(...data.map((d) => d[2]), 40);

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
      data: lines.map(l => l.startsWith('Line') ? l : `Line ${l}`),
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
      inRange: { color: ['#F8FAFC', '#D1FAE5', '#10B981', '#065F46'] }
    },
    series: [
      {
        name: 'Finished VIN Productivity',
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
      title="4. Production Completion Heatmap Matrix"
      subtitle='Question Answered: "When is each production line most productive?"'
      tooltipText="2D productivity heat matrix mapping hourly completed VIN units across assembly lines"
      loading={loading}
      error={error}
    >
      <div className="w-full relative min-h-[280px]">
        <ReactECharts
          option={option}
          notMerge={true}
          lazyUpdate={true}
          opts={{ renderer: 'canvas' }}
          onEvents={onEvents}
          style={{ height, width: '100%' }}
        />
      </div>
    </AnalyticsCard>
  );
});

FgProductionHeatmap.displayName = 'FgProductionHeatmap';
