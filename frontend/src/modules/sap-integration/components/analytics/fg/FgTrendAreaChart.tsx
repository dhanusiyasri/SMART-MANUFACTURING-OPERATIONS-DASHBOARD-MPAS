import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { AnalyticsCard } from '../AnalyticsCard.js';

interface FgTrendAreaChartProps {
  timeCategories: string[];
  fgCounts: number[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const FgTrendAreaChart: React.FC<FgTrendAreaChartProps> = memo(({
  timeCategories,
  fgCounts,
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
    grid: { left: '3%', right: '4%', bottom: '3%', top: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: timeCategories,
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      name: 'Finished Goods Count',
      nameTextStyle: { color: '#64748B', fontSize: 10 },
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    series: [
      {
        name: 'Finished Goods (VIN)',
        type: 'line',
        smooth: true,
        data: fgCounts,
        itemStyle: { color: '#10B981' },
        lineStyle: { width: 2.5 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(16, 185, 129, 0.4)' },
            { offset: 1, color: 'rgba(16, 185, 129, 0.02)' }
          ])
        }
      }
    ]
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="1. Finished Goods Completion Trend"
      subtitle='Question Answered: "How many finished goods are completed over time?"'
      tooltipText="Smooth area trend tracking VIN goods receipts posted to SAP_FG per shift hour"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

FgTrendAreaChart.displayName = 'FgTrendAreaChart';
