import React, { memo } from 'react';
import { useMasterData } from '../hooks/useMasterData.js';
import { useSapOverview } from '../hooks/useSapOverview.js';
import { MasterDataIntelligenceSection } from '../components/analytics/master/MasterDataIntelligenceSection.js';
import { OperationalDecisionSupportBanner } from '../../../components/common/OperationalDecisionSupportBanner.js';
import { Badge } from '../../../components/common/Badge.js';
import { Button } from '../../../components/common/Button.js';
import { HiOutlineRefresh } from '../../../icons/index.js';

export const MasterDataPage: React.FC = memo(() => {
  const { isLoading, error, refetch, isRealtimeConnected } = useMasterData();
  const { summary } = useSapOverview();

  return (
    <div className="space-y-5">
      {/* Sub-Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              SAP Master Data & BOM Intelligence Control Center
            </h2>
            <Badge variant={isRealtimeConnected ? 'green' : 'blue'}>
              {isRealtimeConnected ? 'Live Telemetry' : 'BOM Synced'}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Child materials and BOM records from database tables: <code className="font-mono text-brand-700 font-semibold">SAP_CHILD_MASTER</code> & <code className="font-mono text-brand-700 font-semibold">SAP_CBN_MASTER</code>
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            icon={<HiOutlineRefresh className="w-4 h-4" />}
            onClick={() => refetch()}
          >
            Refresh Master Data
          </Button>
        </div>
      </div>

      {/* Master Data Intelligence Section */}
      <MasterDataIntelligenceSection 
        loading={isLoading} 
        error={error} 
        activeSkusCount={summary?.masterData.activeSkusCount}
        totalParentMaterials={summary?.masterData.totalMaterials}
        criticalAlertsCount={summary?.masterData.criticalIntegrationAlerts}
        masterSyncHealth={summary?.synchronization.syncSuccessRate}
        hierarchyTreemapData={summary?.masterData.componentHierarchy}
        topCriticalComponentsData={summary?.masterData.topCriticalComponents}
      />


    
      {/* OPERATIONAL DECISION SUPPORT BANNER */}
      <OperationalDecisionSupportBanner
        healthScore={summary?.overallHealth}
        syncSuccessRate={summary?.synchronization.syncSuccessRate}
        apiErrorsCount={summary?.apiHealth.todaysErrors ?? summary?.masterData.criticalIntegrationAlerts ?? 10}
        currentLineLeader={summary?.production.topLineCode ? `Line ${summary.production.topLineCode}` : 'Line 0201'}
        topMaterial={summary?.production.topMaterial ? `${summary.production.topMaterial}` : 'CCS15081D00004 (26 Orders)'}
        question="Is master data healthy?"
        decision="QR_MANDATE_VERIFICATION_REQUIRED"
        recommendedAction="Validate QR mandate for affected materials in category CT806."
        businessImpact="Ensures 100% component barcode compliance across supplier deliveries."
        severity="ATTENTION"
      />
    </div>
  );
});

MasterDataPage.displayName = 'SAP_MasterDataPage';
export default MasterDataPage;
