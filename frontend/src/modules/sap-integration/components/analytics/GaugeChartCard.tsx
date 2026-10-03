import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from './AnalyticsCard.js';

interface GaugeChartCardProps {
  title: string;
  subtitle?: string;
  value: number; // 0 to 100
  label?: string;
  loading?: boolean;
  error?: Error | null;
  height?: string;
}

export const GaugeChartCard: React.FC<GaugeChartCardProps> = memo(({
  title,
  subtitle,
  value,
  label = 'System Health',
  loading = false,
  error = null,
  height = '240px'
}) => {
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        pointer: { show: true, length: '60%', width: 5 },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          itemStyle: {
            color: value >= 90 ? '#10B981' : value >= 75 ? '#F59E0B' : '#EF4444'
          }
        },
        axisLine: { lineStyle: { width: 12, color: [[1, '#E2E8F0']] } },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          color: '#0F172A',
          fontSize: 22,
          fontWeight: 'bold',
          offsetCenter: [0, '20%']
        },
        title: {
          offsetCenter: [0, '55%'],
          fontSize: 11,
          color: '#64748B',
          fontWeight: 'bold'
        },
        data: [{ value, name: label }]
      }
    ]
  };

  return (
    <AnalyticsCard title={title} subtitle={subtitle} loading={loading} error={error}>
      <ReactECharts option={option} style={{ height, width: '100%' }} />
    </AnalyticsCard>
  );
});

GaugeChartCard.displayName = 'GaugeChartCard';
