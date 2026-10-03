import React, { memo, useState } from 'react';
import { useApiErrors } from '../hooks/useApiErrors.js';
import { useAnalyticsFilter } from '../../../contexts/FilterContext.js';
import { ApiErrorFilterBar } from '../components/errors/ApiErrorFilterBar.js';
import { ApiErrorTable } from '../components/errors/ApiErrorTable.js';
import { ApiErrorDetailsDrawer } from '../components/errors/ApiErrorDetailsDrawer.js';
import { ApiIntelligenceSection } from '../components/analytics/api/ApiIntelligenceSection.js';
import { Badge } from '../../../components/common/Badge.js';
import { Button } from '../../../components/common/Button.js';
import { HiOutlineRefresh, HiOutlineChartSquareBar } from '../../../icons/index.js';

export const ApiErrorPage: React.FC = memo(() => {
  const { queryParams } = useAnalyticsFilter();
  const {
    errors,
    loading,
    error,
    pagination,
    filters,
    selectedError,
    selectedErrorIds,
    setSelectedError,
    toggleRowSelection,
    selectAllRows,
    setFilters,
    resetFilters,
    setPage,
    setLimit,
    refresh,
    isRealtimeConnected
  } = useApiErrors();

  const [showAnalyticsView, setShowAnalyticsView] = useState<boolean>(true);

  return (
    <div className="space-y-5">
      {/* Sub-Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              API Error Center & Intelligence (SAP_API_ERROR_LOG)
            </h2>
            <Badge variant={isRealtimeConnected ? 'red' : 'gray'}>
              {isRealtimeConnected ? 'Live Stream Active' : 'DB Log Synced'}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Enterprise integration monitoring & AI operational insights for 45,000+ SAP ERP API failure logs
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Toggle View Mode */}
          <button
            onClick={() => setShowAnalyticsView((prev) => !prev)}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              showAnalyticsView
                ? 'bg-brand-50 text-brand-700 border-brand-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <HiOutlineChartSquareBar className="w-4 h-4" />
            <span>{showAnalyticsView ? 'Analytics View Active' : 'Show Intelligence Visuals'}</span>
          </button>

          <Button
            variant="outline"
            size="sm"
            icon={<HiOutlineRefresh className="w-4 h-4" />}
            onClick={refresh}
          >
            Refresh Error Logs
          </Button>
        </div>
      </div>

      {/* Dedicated Power BI & Grafana API Intelligence Visuals Section */}
      {showAnalyticsView && (
        <ApiIntelligenceSection filters={queryParams} />
      )}

      {/* Advanced Filter Bar */}
      <ApiErrorFilterBar
        filters={filters}
        onApplyFilters={setFilters}
        onResetFilters={resetFilters}
      />

      {/* API Error Data Grid */}
      <ApiErrorTable
        errors={errors}
        loading={loading}
        error={error}
        pagination={pagination}
        selectedErrorIds={selectedErrorIds}
        onToggleSelectRow={toggleRowSelection}
        onSelectAllRows={selectAllRows}
        onSelectError={setSelectedError}
        onPageChange={setPage}
        onLimitChange={setLimit}
      />

      {/* Right-Side Error Details Drawer */}
      <ApiErrorDetailsDrawer
        errorLog={selectedError}
        onClose={() => setSelectedError(null)}
      />
    </div>
  );
});

ApiErrorPage.displayName = 'ApiErrorPage';
export default ApiErrorPage;
