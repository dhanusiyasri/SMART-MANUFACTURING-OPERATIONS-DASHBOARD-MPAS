import React, { memo } from 'react';
import { useSynchronization } from '../hooks/useSynchronization.js';
import { useAnalyticsFilter } from '../../../contexts/FilterContext.js';
import { SyncIntelligenceSection } from '../components/analytics/sync/SyncIntelligenceSection.js';
import { Badge } from '../../../components/common/Badge.js';
import { Button } from '../../../components/common/Button.js';
import { HiOutlineRefresh } from '../../../icons/index.js';

export const SynchronizationPage: React.FC = memo(() => {
  const { queryParams } = useAnalyticsFilter();
  const { data, refetch, isRealtimeConnected } = useSynchronization();

  return (
    <div className="space-y-5">
      {/* Sub-Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Synchronization Control & Intelligence (SAP_DATA_FOUND_LOG)
            </h2>
            <Badge variant={isRealtimeConnected ? 'green' : 'blue'}>
              {isRealtimeConnected ? 'Socket.IO Live Stream' : '4.7M+ Record Scale'}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Microsoft Fabric & Power BI-inspired analytics engine for 4,700,000+ SAP ERP synchronization records
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            icon={<HiOutlineRefresh className="w-4 h-4" />}
            onClick={() => refetch()}
          >
            Refresh Sync Intelligence
          </Button>
        </div>
      </div>

      {/* Dedicated Power BI & Microsoft Fabric Synchronization Intelligence Dashboard */}
      <SyncIntelligenceSection filters={queryParams} />
    </div>
  );
});

SynchronizationPage.displayName = 'SynchronizationPage';
export default SynchronizationPage;
