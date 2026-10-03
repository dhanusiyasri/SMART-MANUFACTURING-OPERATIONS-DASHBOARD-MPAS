import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { AnalyticsCard } from '../AnalyticsCard.js';

interface FgReceiptTrendAreaChartProps {
  days: string[];
  receiptCounts: number[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const FgReceiptTrendAreaChart: React.FC<FgReceiptTrendAreaChartProps> = memo(({
  days,
  receiptCounts,
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
      data: days,
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      name: 'VIN Completions',
      nameTextStyle: { color: '#64748B', fontSize: 10 },
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    series: [
      {
        name: 'Movement 101 Receipts',
        type: 'line',
        smooth: true,
        data: receiptCounts,
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
      title="Finished Goods Completion Trend (Movement 101)"
      subtitle="Daily VIN goods receipts posted from assembly line to SAP_FG"
      tooltipText="Tracks vehicle completion throughput and movement type 101 posting velocity"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

FgReceiptTrendAreaChart.displayName = 'FgReceiptTrendAreaChart';
