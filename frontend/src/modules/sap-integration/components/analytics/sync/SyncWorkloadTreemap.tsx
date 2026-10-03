import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';
import { AnalyticsCard } from '../AnalyticsCard.js';
import { TreemapNode } from '../TreemapChartCard.js';

interface SyncWorkloadTreemapProps {
  data: TreemapNode[];
  loading?: boolean;
  error?: Error | null;
  height?: string;
  onChartClick?: (params: unknown) => void;
}

export const SyncWorkloadTreemap: React.FC<SyncWorkloadTreemapProps> = memo(({
  data,
  loading = false,
  error = null,
  height = '280px',
  onChartClick
}) => {
  const option = {
    tooltip: {
      backgroundColor: '#0F172A',
      textStyle: { color: '#F8FAFC', fontSize: 11 }
    },
    series: [
      {
        type: 'treemap',
        data,
        roam: false,
        nodeClick: false,
        breadcrumb: { show: false },
        label: { show: true, fontSize: 10, color: '#FFFFFF', fontWeight: 'bold' },
        itemStyle: { borderColor: '#FFFFFF', borderWidth: 1, gapWidth: 1 }
      }
    ]
  };

  const onEvents = onChartClick ? { click: onChartClick } : undefined;

  return (
    <AnalyticsCard
      title="5. API Workload Distribution Hierarchy"
      subtitle='Question Answered: "How is workload distributed?"'
      tooltipText="Multi-level treemap breakdown of database synchronization throughput"
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

SyncWorkloadTreemap.displayName = 'SyncWorkloadTreemap';
