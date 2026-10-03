import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

interface ProductionHeatmapProps {
  hours: string[]; // 06:00 - 22:00
  lines: string[]; // Line 1 - Line 5
  data: [number, number, number][]; // [hourIndex, lineIndex, count]
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const ProductionHeatmap: React.FC<ProductionHeatmapProps> = memo(({
  hours,
  lines,
  data,
  loading = false,
  error = null,
  height = '280px',
  onChartClick
}) => {
  const lineColors: Record<string, string> = {
    '0101': '#2563EB',
    '0201': '#10B981',
    '0203': '#F59E0B'
  };

  const series = lines.map((lineName, lineIdx) => {
    const seriesData = hours.map((_, hourIdx) => {
      const match = data.find(([hIdx, lIdx]) => hIdx === hourIdx && lIdx === lineIdx);
      return match ? match[2] : 0;
    });

    return {
      name: `Line ${lineName}`,
      type: 'bar',
      stack: 'hourlyOutput',
      emphasis: { focus: 'series' },
      barWidth: '50%',
      itemStyle: {
        color: lineColors[lineName] || '#6366F1',
        borderRadius: lineIdx === lines.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]
      },
      data: seriesData
    };
  });

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#0F172A',
      textStyle: { color: '#F8FAFC', fontSize: 11 },
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: lines.map((l) => `Line ${l}`),
      top: '0%',
      right: '2%',
      textStyle: { color: '#64748B', fontSize: 10, fontWeight: 'bold' }
    },
    grid: { left: '3%', right: '4%', bottom: '8%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: hours,
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 9, rotate: 0 }
    },
    yAxis: {
      type: 'value',
      name: 'Sequence Units',
      nameTextStyle: { color: '#64748B', fontSize: 10 },
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    series
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="6. Hourly Production Output by Line"
      subtitle="Business Question: What is the hourly output across assembly lines?"
      tooltipText="Stacked hourly production volume broken down by assembly line (0101, 0201, 0203)"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

ProductionHeatmap.displayName = 'ProductionHeatmap';
