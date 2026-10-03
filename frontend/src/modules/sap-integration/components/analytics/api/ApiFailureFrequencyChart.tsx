import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

export interface ApiFailureMessageItem {
  errorMessage: string;
  errorCount: number;
}

interface ApiFailureFrequencyChartProps {
  messages: ApiFailureMessageItem[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const ApiFailureFrequencyChart: React.FC<ApiFailureFrequencyChartProps> = memo(({
  messages,
  loading = false,
  error = null,
  height = '280px',
  onChartClick
}) => {
  const categories = messages.map((m) => m.errorMessage);
  const counts = messages.map((m) => m.errorCount);

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#0F172A',
      textStyle: { color: '#F8FAFC', fontSize: 11 },
      axisPointer: { type: 'shadow' }
    },
    grid: { left: '3%', right: '5%', bottom: '8%', top: '8%', containLabel: true },
    xAxis: {
      type: 'value',
      name: 'Exceptions',
      nameTextStyle: { color: '#64748B', fontSize: 10 },
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    yAxis: {
      type: 'category',
      data: categories,
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 10, width: 140, overflow: 'truncate' }
    },
    series: [
      {
        name: 'Failure Frequency',
        type: 'bar',
        data: counts,
        itemStyle: { color: '#DC2626', borderRadius: [0, 4, 4, 0] },
        label: { show: true, position: 'right', fontSize: 10, color: '#475569' }
      }
    ]
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="4. API Failure Frequency Analysis"
      subtitle="Most Frequent Exception Messages & Error Descriptions"
      tooltipText="Ranks exact error messages by occurrence frequency directly from SAP_API_ERROR_LOG"
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

ApiFailureFrequencyChart.displayName = 'ApiFailureFrequencyChart';
