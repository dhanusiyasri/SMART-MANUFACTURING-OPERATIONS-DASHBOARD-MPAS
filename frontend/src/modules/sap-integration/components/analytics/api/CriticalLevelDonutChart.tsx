import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

export interface CriticalDonutItem {
  name: string;
  value: number;
  color?: string;
}

interface CriticalLevelDonutChartProps {
  data: CriticalDonutItem[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const CriticalLevelDonutChart: React.FC<CriticalLevelDonutChartProps> = memo(({
  data,
  loading = false,
  error = null,
  height = '280px',
  onChartClick
}) => {
  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: '#0F172A',
      textStyle: { color: '#F8FAFC', fontSize: 11 }
    },
    legend: {
      orient: 'vertical',
      right: '0%',
      top: 'middle',
      textStyle: { color: '#64748B', fontSize: 10 }
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: { label: { show: true, fontSize: 11, fontWeight: 'bold' } },
        data: data.map((item) => ({
          name: item.name,
          value: item.value,
          itemStyle: item.color ? { color: item.color } : undefined
        }))
      }
    ]
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="4. Critical Severity Distribution"
      subtitle='Question Answered: "How severe are today’s failures?"'
      tooltipText="Breakdown of Level 1 (Critical), Level 2 (High), and Level 3 (Medium) exceptions"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

CriticalLevelDonutChart.displayName = 'CriticalLevelDonutChart';
