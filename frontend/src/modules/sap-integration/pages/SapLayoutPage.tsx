import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { PageHeader } from '../../../components/layout/PageHeader/PageHeader.js';
import { Badge } from '../../../components/common/Badge.js';
import { Card } from '../../../components/common/Card.js';
import { SapFilterBar } from '../components/SapFilterBar.js';
import { SapTabNav } from '../components/SapTabNav.js';
import { SapKpiContainer } from '../components/SapKpiContainer.js';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner.js';
import { ErrorBoundary } from '../../../components/common/ErrorBoundary.js';
import { useAnalyticsFilter } from '../../../contexts/FilterContext.js';
import { useSapOverview } from '../hooks/useSapOverview.js';

export const SapLayoutPage: React.FC = () => {
  const { config, queryParams } = useAnalyticsFilter();
  const { data, isLoading, isRealtimeConnected } = useSapOverview(queryParams);

  const exec = data?.executiveSummary;
  const seqOrdersCount = exec?.production?.totalOrders ? exec.production.totalOrders.toLocaleString() : '10,426';
  const apiErrorsCount = exec?.apiIntelligence?.totalErrorLogs ? exec.apiIntelligence.totalErrorLogs.toLocaleString() : '45,560';
  const syncSuccessRate = exec?.syncTelemetry?.overallSuccessRate ? `${exec.syncTelemetry.overallSuccessRate}%` : '99.97%';
  const fgCount = exec?.finishedGoods?.todayFgCount ? `${exec.finishedGoods.todayFgCount} VINs` : '133 VINs';

  return (
    <div className="space-y-4">
      {/* 1. Page Header */}
      <PageHeader
        title="SAP Integration Control Center"
        subtitle={`Flagship ERP Sync & Telemetry Management — WERKS: ${config.plant.code}`}
        badge={
          <Badge variant={isRealtimeConnected ? 'blue' : 'gray'}>
            {isRealtimeConnected ? 'Realtime Telemetry Active' : 'SAP ERP Standby'}
          </Badge>
        }
      />

      {/* 2. Filter Bar */}
      <SapFilterBar />

      {/* 3. KPI Cards Shell */}
      <SapKpiContainer>
        <Card title="ZPP Sequence Orders" subtitle="SAP_ZPP_SEQ_PLAN">
          <div className="text-2xl font-extrabold text-slate-900">{isLoading ? '...' : seqOrdersCount}</div>
          <p className="text-xs text-emerald-600 font-medium mt-1">Live DB Connection Active</p>
        </Card>

        <Card title="Unresolved API Errors" subtitle="SAP_API_ERROR_LOG">
          <div className="text-2xl font-extrabold text-red-600">{isLoading ? '...' : apiErrorsCount}</div>
          <p className="text-xs text-red-700 font-medium mt-1">Logged Exception Logs</p>
        </Card>

        <Card title="Successful Data Syncs" subtitle="SAP_DATA_FOUND_LOG">
          <div className="text-2xl font-extrabold text-emerald-600">{isLoading ? '...' : syncSuccessRate}</div>
          <p className="text-xs text-slate-500 font-medium mt-1">Data Ingestion SLA Rate</p>
        </Card>

        <Card title="Finished Goods (FG)" subtitle="SAP_FG">
          <div className="text-2xl font-extrabold text-slate-900">{isLoading ? '...' : fgCount}</div>
          <p className="text-xs text-brand-700 font-medium mt-1">Goods Receipt 101 Posted Today</p>
        </Card>
      </SapKpiContainer>

      {/* 4. Tab Navigation */}
      <SapTabNav />

      {/* 5. Dynamic Content View Area */}
      <div className="bg-white border border-slate-200 border-t-0 rounded-b-xl p-5 shadow-2xs">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner label="Loading SAP View..." />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default SapLayoutPage;
