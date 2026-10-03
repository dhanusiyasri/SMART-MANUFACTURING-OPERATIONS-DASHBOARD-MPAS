import React, { useState } from 'react';
import { ProductionOrderFilters, SAPOrderStatus } from '../../types/sapOrder.type.js';
import { Button } from '../../../../components/common/Button.js';
import { HiOutlineSearch, HiOutlineAdjustments, HiOutlineRefresh } from '../../../../icons/index.js';
import { usePlantContext } from '../../../../hooks/usePlantContext.js';

interface ProductionFilterBarProps {
  filters: ProductionOrderFilters;
  onApplyFilters: (newFilters: ProductionOrderFilters) => void;
  onResetFilters: () => void;
}

export const ProductionFilterBar: React.FC<ProductionFilterBarProps> = ({
  filters,
  onApplyFilters,
  onResetFilters
}) => {
  const { plants, lines } = usePlantContext();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [localFilters, setLocalFilters] = useState<ProductionOrderFilters>(filters);

  const handleInputChange = (field: keyof ProductionOrderFilters, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(localFilters);
  };

  const handleReset = () => {
    onResetFilters();
    setLocalFilters({
      startDate: '',
      endDate: '',
      plantCode: '',
      assemblyLineCode: '',
      materialCode: '',
      plnum: '',
      vinNumber: '',
      status: 'ALL',
      searchQuery: ''
    });
  };

  return (
    <form onSubmit={handleApply} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 shadow-2xs">
      {/* Top Bar: Quick Search & Toggle Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Quick Search */}
        <div className="relative flex-1 max-w-lg">
          <HiOutlineSearch className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={localFilters.searchQuery || ''}
            onChange={(e) => handleInputChange('searchQuery', e.target.value)}
            placeholder="Search by Order # (PLNUM), VIN / Serial Number, or Material Code..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            aria-label="Quick Search Production Orders"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className={`inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
              isExpanded
                ? 'bg-brand-50 text-brand-700 border-brand-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <HiOutlineAdjustments className="w-4 h-4" />
            <span>Advanced Filters</span>
          </button>

          <Button type="submit" variant="primary" size="sm">
            Apply Filters
          </Button>

          <button
            type="button"
            onClick={handleReset}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
            title="Reset Filters"
            aria-label="Reset Filters"
          >
            <HiOutlineRefresh className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Advanced Filter Expansion Grid */}
      {isExpanded && (
        <div className="pt-3 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-in fade-in duration-150">
          {/* Order # (PLNUM) */}
          <div>
            <label className="text-3xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Order Number (PLNUM)
            </label>
            <input
              type="text"
              value={localFilters.plnum || ''}
              onChange={(e) => handleInputChange('plnum', e.target.value)}
              placeholder="e.g. PL-94820"
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-brand-500"
            />
          </div>

          {/* VIN / Serial Number */}
          <div>
            <label className="text-3xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              VIN / Serial Number
            </label>
            <input
              type="text"
              value={localFilters.vinNumber || ''}
              onChange={(e) => handleInputChange('vinNumber', e.target.value)}
              placeholder="e.g. MB1-AL-4820"
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-brand-500"
            />
          </div>

          {/* Plant */}
          <div>
            <label className="text-3xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Plant Location
            </label>
            <select
              value={localFilters.plantCode || ''}
              onChange={(e) => handleInputChange('plantCode', e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-brand-500"
            >
              <option value="">All Plants</option>
              {plants.map((p) => (
                <option key={p.id} value={p.code}>
                  {p.name} ({p.code})
                </option>
              ))}
            </select>
          </div>

          {/* Assembly Line */}
          <div>
            <label className="text-3xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Production Line
            </label>
            <select
              value={localFilters.assemblyLineCode || ''}
              onChange={(e) => handleInputChange('assemblyLineCode', e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-brand-500"
            >
              <option value="">All Production Lines</option>
              {lines.map((l) => (
                <option key={l.id} value={l.code}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Material Code */}
          <div>
            <label className="text-3xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Material Code
            </label>
            <input
              type="text"
              value={localFilters.materialCode || ''}
              onChange={(e) => handleInputChange('materialCode', e.target.value)}
              placeholder="e.g. MAT-AL-8820"
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-brand-500"
            />
          </div>

          {/* SAP Status */}
          <div>
            <label className="text-3xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              SAP Status
            </label>
            <select
              value={localFilters.status || 'ALL'}
              onChange={(e) => handleInputChange('status', e.target.value as SAPOrderStatus | 'ALL')}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-brand-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUCCESS">Success</option>
              <option value="WARNING">Warning</option>
              <option value="FAILED">Failed</option>
              <option value="PENDING">Pending</option>
              <option value="UNKNOWN">Unknown</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="text-3xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={localFilters.startDate || ''}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-brand-500"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="text-3xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              End Date
            </label>
            <input
              type="date"
              value={localFilters.endDate || ''}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-brand-500"
            />
          </div>
        </div>
      )}
    </form>
  );
};
