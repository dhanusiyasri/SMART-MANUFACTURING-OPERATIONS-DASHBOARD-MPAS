import React, { memo } from 'react';
import { Card } from '../../../../components/common/Card.js';
import { ApiErrorKPIsSummary } from '../../types/apiErrorLog.type.js';
import { HiOutlineExclamationCircle } from '../../../../icons/index.js';

interface ApiErrorKPIsProps {
  kpis: ApiErrorKPIsSummary;
  loading?: boolean;
  error?: Error | null;
}

export const ApiErrorKPIs: React.FC<ApiErrorKPIsProps> = memo(({ kpis, loading = false, error = null }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-3 bg-slate-200 rounded-md w-20 mb-2" />
            <div className="h-7 bg-slate-200 rounded-md w-16" />
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center space-x-3 text-xs">
        <HiOutlineExclamationCircle className="w-5 h-5 shrink-0" />
        <div>
          <p className="font-bold">Failed to load API Error Center KPIs</p>
          <p className="text-3xs text-red-600 mt-0.5">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* 1. Total Errors */}
      <Card className="hover:border-slate-300 transition-colors">
        <span className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">
          Total Error Log
        </span>
        <div className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
          {kpis.totalErrors.toLocaleString()}
        </div>
        <span className="text-3xs text-slate-400 font-medium">SAP_API_ERROR_LOG</span>
      </Card>

      {/* 2. Critical Errors */}
      <Card className="hover:border-slate-300 transition-colors">
        <span className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">
          Critical Errors
        </span>
        <div className="text-2xl font-black text-red-600 mt-1 tracking-tight">
          {kpis.criticalErrors.toLocaleString()}
        </div>
        <span className="text-3xs text-red-700 font-medium">Level 1 Exceptions</span>
      </Card>

      {/* 3. Timeout Errors */}
      <Card className="hover:border-slate-300 transition-colors">
        <span className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">
          Timeout Errors
        </span>
        <div className="text-2xl font-black text-amber-600 mt-1 tracking-tight">
          {kpis.timeoutErrors.toLocaleString()}
        </div>
        <span className="text-3xs text-amber-700 font-medium">HTTP 504 / Socket Timeouts</span>
      </Card>

      {/* 4. Resolved Errors */}
      <Card className="hover:border-slate-300 transition-colors">
        <span className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">
          Resolved Errors
        </span>
        <div className="text-2xl font-black text-emerald-600 mt-1 tracking-tight">
          {kpis.resolvedErrors.toLocaleString()}
        </div>
        <span className="text-3xs text-emerald-700 font-medium">Auto & Manual Fixes</span>
      </Card>

      {/* 5. Pending Errors */}
      <Card className="hover:border-slate-300 transition-colors">
        <span className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">
          Pending Errors
        </span>
        <div className="text-2xl font-black text-brand-700 mt-1 tracking-tight">
          {kpis.pendingErrors.toLocaleString()}
        </div>
        <span className="text-3xs text-brand-600 font-medium">Awaiting Retry/Replay</span>
      </Card>

      {/* 6. Unique APIs with Errors */}
      <Card className="hover:border-slate-300 transition-colors">
        <span className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">
          Affected APIs
        </span>
        <div className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
          {kpis.uniqueApisWithErrors.toLocaleString()}
        </div>
        <span className="text-3xs text-slate-400 font-medium">Unique Endpoints</span>
      </Card>
    </div>
  );
});

ApiErrorKPIs.displayName = 'ApiErrorKPIs';
