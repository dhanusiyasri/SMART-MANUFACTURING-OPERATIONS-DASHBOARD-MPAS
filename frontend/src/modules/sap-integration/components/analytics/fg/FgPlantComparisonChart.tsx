import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

export interface PlantFgSeries {
  plantName: string;
  data: number[];
  color: string;
}

interface FgPlantComparisonChartProps {
  categories: string[]; // Shift A, Shift B, Shift C
  series: PlantFgSeries[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const FgPlantComparisonChart: React.FC<FgPlantComparisonChartProps> = memo(({
  categories,
  series,
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
    legend: { bottom: '0%', textStyle: { color: '#64748B', fontSize: 10 } },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '8%', containLabel: true },
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      name: 'Finished Units',
      nameTextStyle: { color: '#64748B', fontSize: 10 },
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    series: series.map((s) => ({
      name: s.plantName,
      type: 'bar',
      data: s.data,
      itemStyle: { color: s.color, borderRadius: [4, 4, 0, 0] }
    }))
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="5. Production Line Shift Distribution"
      subtitle='Question Answered: "How is output distributed across shifts per line?"'
      tooltipText="Clustered column visual comparing VIN completion counts across Lines 0101, 0201, and 0203 per shift"
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

FgPlantComparisonChart.displayName = 'FgPlantComparisonChart';
