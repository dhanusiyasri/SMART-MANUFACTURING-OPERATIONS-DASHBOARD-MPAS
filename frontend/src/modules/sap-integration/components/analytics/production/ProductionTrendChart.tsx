import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

export interface ProductionTrendSeries {
  lineName: string;
  data: number[];
  color?: string;
}

interface ProductionTrendChartProps {
  timeCategories: string[];
  series: ProductionTrendSeries[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const ProductionTrendChart: React.FC<ProductionTrendChartProps> = memo(({
  timeCategories,
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
      textStyle: { color: '#F8FAFC', fontSize: 11 }
    },
    legend: { bottom: '0%', textStyle: { color: '#64748B', fontSize: 10 } },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '8%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: timeCategories,
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      name: 'Orders Count',
      nameTextStyle: { color: '#64748B', fontSize: 10 },
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    series: series.map((s) => ({
      name: s.lineName,
      type: 'line',
      smooth: true,
      data: s.data,
      itemStyle: { color: s.color || '#2563EB' },
      lineStyle: { width: 2.5 }
    }))
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="1. Production Trend Throughout Shift"
      subtitle="Business Question: How many production orders are received over time?"
      tooltipText="Tracks hourly sequence plan volume per assembly line from SAP_ZPP_SEQ_PLAN"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

ProductionTrendChart.displayName = 'ProductionTrendChart';
