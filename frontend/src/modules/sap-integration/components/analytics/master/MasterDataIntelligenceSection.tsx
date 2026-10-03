import React, { memo } from 'react';
import { KpiCard } from '../KpiCard.js';
import { InsightCard } from '../InsightCard.js';
import { MaterialCategoryTreemap } from './MaterialCategoryTreemap.js';
import { CriticalBomComponentsChart } from './CriticalBomComponentsChart.js';
import { TreemapNode } from '../TreemapChartCard.js';

interface MasterDataIntelligenceSectionProps {
  loading?: boolean;
  error?: Error | null;
  activeSkusCount?: number;
  totalParentMaterials?: number;
  criticalAlertsCount?: number;
  masterSyncHealth?: number;
  hierarchyTreemapData?: TreemapNode[];
  topCriticalComponentsData?: { componentName: string; dependencyCount: number }[];
}

export const MasterDataIntelligenceSection: React.FC<MasterDataIntelligenceSectionProps> = memo(({
  loading = false,
  error = null,
  activeSkusCount = 10420,
  totalParentMaterials = 2069,
  criticalAlertsCount = 10,
  masterSyncHealth = 99.97,
  hierarchyTreemapData,
  topCriticalComponentsData
}) => {
  const masterTreemapData: TreemapNode[] = hierarchyTreemapData || [
    {
      name: 'FERT (Parent Vehicle Assembly Masters)',
      value: totalParentMaterials || 2069,
      children: [
        { name: 'MM30001877 (Solo Rear Axle)', value: 15 },
        { name: 'CCS15081D00004 (SS 15081 Bus)', value: 13 },
        { name: 'CDF192032C0003 (F1920 Haulage)', value: 10 }
      ]
    },
    {
      name: 'HALB (Child Component Masters)',
      value: activeSkusCount || 10420,
      children: [
        { name: 'Engine & Transmission Sub-assemblies', value: 6252 },
        { name: 'Chassis & Axle Assemblies', value: 4168 }
      ]
    }
  ];

  const criticalComponents = topCriticalComponentsData && topCriticalComponentsData.length > 0
    ? topCriticalComponentsData.map(item => item.componentName)
    : ['C_COWL/ CAB/ FES', 'C_REAR AXLE', 'C_BRAKE ASSEMBLY', 'C_HALF AXLE', 'C_CABIN'];

  const dependencyCounts = topCriticalComponentsData && topCriticalComponentsData.length > 0
    ? topCriticalComponentsData.map(item => item.dependencyCount)
    : [466, 562, 565, 1039, 2076];

  return (
    <div className="space-y-4">
      {/* Executive KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard
          title="Active Material SKUs"
          value={activeSkusCount ? activeSkusCount.toLocaleString() : '10,420'}
          subtitle="SAP_CHILD_MASTER Table Records"
          trend={{ value: '100% Active', isPositive: true }}
        />
        <KpiCard
          title="Parent BOM Assemblies"
          value={totalParentMaterials ? totalParentMaterials.toLocaleString() : '2,069'}
          subtitle="SAP_CBN_MASTER Table Records"
          trend={{ value: '100% Validated', isPositive: true }}
        />
        <KpiCard
          title="Critical Integration Alerts"
          value={`${criticalAlertsCount ?? 10} Critical`}
          subtitle="Level 1 API Exceptions (SAP_API_Error_Log)"
          trend={{ value: 'System Timeout Exceptions', isPositive: false }}
        />
        <KpiCard
          title="Master Sync Health"
          value={`${masterSyncHealth ?? 99.97}%`}
          subtitle="SAP_DATA_FOUND_LOG Telemetry"
          trend={{ value: '28,608 Sync Events', isPositive: true }}
        />
      </div>

      {/* Decision Insight Alert */}
      <InsightCard
        title="Master Data Supply Chain Insight"
        description="BOM resolution rate for SAP_CBN_MASTER reached 99.9%. 4 critical child materials identified with high order dependency on Line 1 Engine shop."
        recommendation="Verify safety stock allocation for H-Series Cylinder Head stock before Shift C."
        severity="INFO"
      />

      {/* 12-Column Responsive Power BI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* Material Category Treemap (Col 7) */}
        <div className="lg:col-span-7">
          <MaterialCategoryTreemap
            data={masterTreemapData}
            loading={loading}
            error={error}
          />
        </div>

        {/* Critical BOM Components Bar Chart (Col 5) */}
        <div className="lg:col-span-5">
          <CriticalBomComponentsChart
            components={criticalComponents}
            dependencyCounts={dependencyCounts}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
});

MasterDataIntelligenceSection.displayName = 'MasterDataIntelligenceSection';
