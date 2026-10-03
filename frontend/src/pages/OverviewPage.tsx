import React from 'react';
import { Card } from '../components/common/Card.js';
import { Badge } from '../components/common/Badge.js';
import { Button } from '../components/common/Button.js';
import { PageHeader } from '../components/layout/PageHeader/PageHeader.js';
import { useDashboardTestQuery, QUERY_KEYS, useRefreshWidget } from '../hooks/useDashboardQuery.js';
import { usePlantContext } from '../hooks/usePlantContext.js';
import { HiOutlineRefresh } from '../icons/index.js';

export const OverviewPage: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useDashboardTestQuery();
  const refreshWidget = useRefreshWidget();
  const { selectedPlant, selectedLine } = usePlantContext();

  return (
    <div className="space-y-6">
      {/* Reusable Page Header */}
      <PageHeader
        title="Executive Overview"
        subtitle={`Real-time manufacturing operations for ${selectedPlant.name} (${selectedLine.name})`}
        badge={<Badge variant="green">Live Stream Active</Badge>}
        actions={
          <Button
            variant="outline"
            size="sm"
            icon={<HiOutlineRefresh className="w-4 h-4" />}
            onClick={() => refreshWidget(QUERY_KEYS.DASHBOARD_TEST)}
          >
            Refresh Metrics
          </Button>
        }
      />

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total SAP Orders" subtitle="SAP_ZPP_SEQ_PLAN Table">
          {isLoading ? (
            <div className="animate-pulse flex flex-col space-y-2 py-2">
              <div className="h-8 bg-slate-200 rounded-md w-24" />
              <div className="h-3 bg-slate-200 rounded-md w-36" />
            </div>
          ) : isError ? (
            <div className="text-xs text-red-600 font-medium">
              <p>Error loading metric:</p>
              <p className="text-3xs text-slate-500 mt-1">{error instanceof Error ? error.message : 'Unknown error'}</p>
              <button onClick={() => refetch()} className="text-brand-600 underline mt-2 font-bold">
                Retry Query
              </button>
            </div>
          ) : (
            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {data?.data.totalOrders?.toLocaleString() ?? 0}
              </div>
              <p className="text-xs text-emerald-600 font-medium mt-1">
                Connected to MS SQL Server (MPAS_DB)
              </p>
            </div>
          )}
        </Card>

        <Card title="Plant Efficiency (OEE)" subtitle={selectedPlant.name}>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">88.4%</div>
          <p className="text-xs text-emerald-600 font-medium mt-1">+2.1% from target threshold</p>
        </Card>

        <Card title="Active Line Telemetry" subtitle={selectedLine.name}>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">Active</div>
          <p className="text-xs text-slate-500 font-medium mt-1">Operational & Connected</p>
        </Card>

        <Card title="Critical Telemetry Alerts" subtitle="Automated Sensors">
          <div className="text-3xl font-extrabold text-amber-600 tracking-tight">2 Alerts</div>
          <p className="text-xs text-amber-700 font-medium mt-1">Minor cycle delay on Line 2</p>
        </Card>
      </div>
    </div>
  );
};

export default OverviewPage;
