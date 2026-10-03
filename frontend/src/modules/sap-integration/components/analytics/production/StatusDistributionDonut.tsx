import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

export interface StatusDonutItem {
  name: string;
  value: number;
  color?: string;
}

interface StatusDistributionDonutProps {
  data: StatusDonutItem[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const StatusDistributionDonut: React.FC<StatusDistributionDonutProps> = memo(({
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
      title="4. SAP Status Distribution"
      subtitle="Business Question: Which SAP statuses occur most often?"
      tooltipText="Percentage distribution of Success, Pending, Failed, and Processing orders in SAP_ZPP_SEQ_PLAN"
      loading={loading}
      error={error}
    >
      <ReactECharts option={option} onEvents={onEvents} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

StatusDistributionDonut.displayName = 'StatusDistributionDonut';
