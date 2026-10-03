import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

export interface StageDonutItem {
  name: string; // e.g. MPAS_OK, MPAS_LD, MPAS_OT
  value: number;
  color?: string;
}

interface FgStageDonutChartProps {
  data: StageDonutItem[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const FgStageDonutChart: React.FC<FgStageDonutChartProps> = memo(({
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
      title="2. Production Stage Distribution"
      subtitle='Question Answered: "Which production stages dominate?"'
      tooltipText="Percentage distribution of MPAS_OK (Pass), MPAS_LD (Line Defect), and MPAS_OT (Off-Track Retest)"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

FgStageDonutChart.displayName = 'FgStageDonutChart';
