import React, { memo } from 'react';
import { Card } from '../../../../components/common/Card.js';
import { ProductionKPIsSummary } from '../../types/sapOrder.type.js';
import { HiOutlineExclamationCircle } from '../../../../icons/index.js';

interface ProductionKPIsProps {
  kpis: ProductionKPIsSummary;
  loading?: boolean;
  error?: Error | null;
}

export const ProductionKPIs: React.FC<ProductionKPIsProps> = memo(({ kpis, loading = false, error = null }) => {
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
          <p className="font-bold">Failed to load Production Order KPIs</p>
          <p className="text-3xs text-red-600 mt-0.5">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* 1. Total Orders */}
      <Card className="hover:border-slate-300 transition-colors">
        <span className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">
          Total Orders
        </span>
        <div className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
          {kpis.totalOrders.toLocaleString()}
        </div>
        <span className="text-3xs text-slate-400 font-medium">SAP_ZPP_SEQ_PLAN</span>
      </Card>

      {/* 2. Orders Today */}
      <Card className="hover:border-slate-300 transition-colors">
        <span className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">
          Orders Today
        </span>
        <div className="text-2xl font-black text-brand-700 mt-1 tracking-tight">
          {kpis.ordersToday.toLocaleString()}
        </div>
        <span className="text-3xs text-brand-600 font-medium">Current Shift Output</span>
      </Card>

      {/* 3. Successful Orders */}
      <Card className="hover:border-slate-300 transition-colors">
        <span className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">
          Successful
        </span>
        <div className="text-2xl font-black text-emerald-600 mt-1 tracking-tight">
          {kpis.successfulOrders.toLocaleString()}
        </div>
        <span className="text-3xs text-emerald-700 font-medium">
          {kpis.totalOrders > 0 ? ((kpis.successfulOrders / kpis.totalOrders) * 100).toFixed(1) : '100.0'}% Pass Rate
        </span>
      </Card>

      {/* 4. Failed Orders */}
      <Card className="hover:border-slate-300 transition-colors">
        <span className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">
          Failed Orders
        </span>
        <div className="text-2xl font-black text-red-600 mt-1 tracking-tight">
          {kpis.failedOrders.toLocaleString()}
        </div>
        <span className="text-3xs text-red-700 font-medium">ERP Exception Log</span>
      </Card>

      {/* 5. Pending Orders */}
      <Card className="hover:border-slate-300 transition-colors">
        <span className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">
          Pending
        </span>
        <div className="text-2xl font-black text-amber-600 mt-1 tracking-tight">
          {kpis.pendingOrders.toLocaleString()}
        </div>
        <span className="text-3xs text-amber-700 font-medium">In Sequence Queue</span>
      </Card>

      {/* 6. Unique Materials */}
      <Card className="hover:border-slate-300 transition-colors">
        <span className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">
          Unique Materials
        </span>
        <div className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
          {kpis.uniqueMaterials.toLocaleString()}
        </div>
        <span className="text-3xs text-slate-400 font-medium">Active SKUs</span>
      </Card>
    </div>
  );
});

ProductionKPIs.displayName = 'ProductionKPIs';
