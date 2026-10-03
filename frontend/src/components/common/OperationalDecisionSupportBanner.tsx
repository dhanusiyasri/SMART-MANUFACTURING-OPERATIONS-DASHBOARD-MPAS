import React, { memo } from 'react';
import { Badge } from './Badge.js';
import { HiOutlineShieldCheck, HiOutlineExclamationCircle, HiOutlineChip, HiOutlineDatabase } from '../../icons/index.js';

interface OperationalDecisionSupportBannerProps {
  healthScore?: number;
  healthStatus?: string;
  healthLabel?: string;
  currentLineLeader?: string;
  topMaterial?: string;
  syncSuccessRate?: number;
  apiErrorsCount?: number;
  loading?: boolean;
  question?: string;
  decision?: string;
  recommendedAction?: string;
  businessImpact?: string;
  severity?: string;
}

export const OperationalDecisionSupportBanner: React.FC<OperationalDecisionSupportBannerProps> = memo(({
  healthScore = 99.7,
  healthStatus = 'EXCELLENT',
  healthLabel = 'Excellent',
  currentLineLeader = 'Line 0203 (52.0% Share)',
  topMaterial = 'MM30001499 (19.9% Share)',
  syncSuccessRate = 99.8,
  apiErrorsCount = 28817,
  loading = false,
  recommendedAction
}) => {
  const isHealthy = healthScore >= 85;

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs mb-4 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-lg border ${isHealthy ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-amber-50 text-amber-600 border-amber-200'}`}>
            {isHealthy ? <HiOutlineShieldCheck className="w-5 h-5" /> : <HiOutlineExclamationCircle className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                Ashok Leyland Executive Decision Support — Plant 2004
              </h3>
              <Badge variant={healthStatus === 'EXCELLENT' ? 'green' : 'blue'}>
                {healthLabel} ({healthScore}/100)
              </Badge>
            </div>
            <p className="text-3xs text-slate-500 mt-0.5 font-medium">
              {recommendedAction || 'Deterministic SQL Business Rules Engine • Microsoft SQL Server (`MPAS_DB`)'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <Badge variant="blue" className="bg-blue-50 text-blue-700 border-blue-200">
            <HiOutlineDatabase className="w-3.5 h-3.5 mr-1 inline" />
            Source: SAP_ZPP_SEQ_PLAN
          </Badge>
          <Badge variant="gray" className="bg-slate-100 text-slate-700 border-slate-200">
            <HiOutlineChip className="w-3.5 h-3.5 mr-1 inline" />
            Plant: 2004
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-50/80 p-2.5 rounded-lg border border-slate-200/80">
          <span className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">Line Leader</span>
          <span className="text-xs font-bold text-slate-900 block mt-0.5">{loading ? '...' : currentLineLeader}</span>
        </div>
        <div className="bg-slate-50/80 p-2.5 rounded-lg border border-slate-200/80">
          <span className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">Top Material SKU</span>
          <span className="text-xs font-bold text-slate-900 block mt-0.5">{loading ? '...' : topMaterial}</span>
        </div>
        <div className="bg-slate-50/80 p-2.5 rounded-lg border border-slate-200/80">
          <span className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">Sync Velocity</span>
          <span className="text-xs font-bold text-emerald-600 block mt-0.5">{loading ? '...' : `${syncSuccessRate}% (28,608 Syncs)`}</span>
        </div>
        <div className="bg-slate-50/80 p-2.5 rounded-lg border border-slate-200/80">
          <span className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">API Exception Log</span>
          <span className="text-xs font-bold text-amber-600 block mt-0.5">{loading ? '...' : `${apiErrorsCount.toLocaleString()} Errors (updateQRV2)`}</span>
        </div>
      </div>
    </div>
  );
});

OperationalDecisionSupportBanner.displayName = 'OperationalDecisionSupportBanner';
