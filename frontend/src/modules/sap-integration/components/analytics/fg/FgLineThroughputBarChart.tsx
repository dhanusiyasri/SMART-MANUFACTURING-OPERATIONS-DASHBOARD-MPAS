import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';

interface FgLineThroughputBarChartProps {
  lineCodes: string[];
  fgVolumes: number[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const FgLineThroughputBarChart: React.FC<FgLineThroughputBarChartProps> = memo(({
  lineCodes,
  fgVolumes,
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
      axisPointer: { type: 'shadow' },
      formatter: (params: any) => {
        const item = params[0];
        const val = Number(item.value).toLocaleString();
        return `<div class="font-bold text-slate-100">${item.name}</div>
                <div class="text-emerald-400 font-mono">Movement 101 Goods Receipts: ${val} Logs</div>
                <div class="text-3xs text-slate-400">Total SAP_FG Receipts Logged</div>`;
      }
    },
    grid: { left: '3%', right: '12%', bottom: '5%', top: '8%', containLabel: true },
    xAxis: {
      type: 'value',
      name: 'Goods Receipt Logs',
      nameTextStyle: { color: '#64748B', fontSize: 10 },
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#64748B', fontSize: 10 }
    },
    yAxis: {
      type: 'category',
      data: lineCodes.map(l => l.startsWith('Line') ? l : `Line ${l}`),
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#475569', fontSize: 11, fontWeight: 'bold' }
    },
    series: [
      {
        name: 'Movement 101 Goods Receipts',
        type: 'bar',
        data: fgVolumes,
        barWidth: '45%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: '#10B981' },
              { offset: 1, color: '#059669' }
            ]
          },
          borderRadius: [0, 4, 4, 0]
        },
        label: {
          show: true,
          position: 'right',
          fontSize: 11,
          fontWeight: 'bold',
          color: '#065F46',
          formatter: (params: any) => Number(params.value).toLocaleString()
        }
      }
    ]
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="3. Finished Goods Output Volume by Production Line (SAP_FG)"
      subtitle='Question Answered: "Which production line logs the highest Movement 101 Goods Receipt volume?"'
      tooltipText="Production line Movement 101 Goods Receipt completion logs directly from SAP_FG table"
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

FgLineThroughputBarChart.displayName = 'FgLineThroughputBarChart';
