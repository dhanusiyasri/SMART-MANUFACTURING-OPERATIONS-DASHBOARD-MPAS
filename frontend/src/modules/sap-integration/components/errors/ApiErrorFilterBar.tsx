import React, { useState, useEffect } from 'react';
import { ApiErrorFilters, CriticalLevel, ApiProcessingStatus } from '../../types/apiErrorLog.type.js';
import { Button } from '../../../../components/common/Button.js';
import { HiOutlineSearch, HiOutlineAdjustments, HiOutlineRefresh } from '../../../../icons/index.js';
import { usePlantContext } from '../../../../hooks/usePlantContext.js';

interface ApiErrorFilterBarProps {
  filters: ApiErrorFilters;
  onApplyFilters: (newFilters: ApiErrorFilters) => void;
  onResetFilters: () => void;
}

export const ApiErrorFilterBar: React.FC<ApiErrorFilterBarProps> = ({
  filters,
  onApplyFilters,
  onResetFilters
}) => {
  const { plants, lines } = usePlantContext();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [localFilters, setLocalFilters] = useState<ApiErrorFilters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleInputChange = (field: keyof ApiErrorFilters, value: string) => {
    const updated = { ...localFilters, [field]: value };
    setLocalFilters(updated);
    // Instant live filter update when changing select dropdowns or quick search
    if (
      field === 'status' ||
      field === 'criticalLevel' ||
      field === 'assemblyLineCode' ||
      field === 'plantCode' ||
      field === 'searchQuery'
    ) {
      onApplyFilters(updated);
    }
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(localFilters);
  };

  const handleReset = () => {
    const defaultState: ApiErrorFilters = {
      startDate: '',
      endDate: '',
      plantCode: '',
      assemblyLineCode: '',
      apiName: '',
      criticalLevel: 'ALL',
      errorCode: '',
      status: 'ALL',
      referenceId: '',
      searchQuery: ''
    };
    setLocalFilters(defaultState);
    onResetFilters();
  };

  return (
    <form onSubmit={handleApply} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 shadow-2xs">
      {/* Top Bar: Search & Action Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Quick Search */}
        <div className="relative flex-1 max-w-lg">
          <HiOutlineSearch className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={localFilters.searchQuery || ''}
            onChange={(e) => handleInputChange('searchQuery', e.target.value)}
            placeholder="Search by Reference ID, API Name, Error Code, or Message..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            aria-label="Quick Search API Errors"
          />
        </div>

        {/* Action Buttons */}
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
          {/* Status Dropdown */}
          <div>
            <label className="text-3xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Processing Status
            </label>
            <select
              value={localFilters.status || 'ALL'}
              onChange={(e) => handleInputChange('status', e.target.value as ApiProcessingStatus | 'ALL')}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-brand-500 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="RESOLVED">Resolved</option>
              <option value="RETRYING">Retrying</option>
              <option value="FAILED">Failed</option>
              <option value="SUCCESS">Success</option>
            </select>
          </div>

          {/* Critical Level */}
          <div>
            <label className="text-3xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Critical Level
            </label>
            <select
              value={localFilters.criticalLevel || 'ALL'}
              onChange={(e) => handleInputChange('criticalLevel', e.target.value as CriticalLevel | 'ALL')}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-brand-500 cursor-pointer"
            >
              <option value="ALL">All Levels</option>
              <option value="LEVEL_1">Level 1 (Critical)</option>
              <option value="LEVEL_2">Level 2 (High)</option>
              <option value="LEVEL_3">Level 3 (Medium)</option>
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
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-brand-500 cursor-pointer"
            >
              <option value="">All Lines (0101, 0201, 0203)</option>
              {lines.map((l) => (
                <option key={l.id} value={l.code}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Plant Location */}
          <div>
            <label className="text-3xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Plant Location
            </label>
            <select
              value={localFilters.plantCode || ''}
              onChange={(e) => handleInputChange('plantCode', e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-brand-500 cursor-pointer"
            >
              <option value="">All Plants</option>
              {plants.map((p) => (
                <option key={p.id} value={p.code}>
                  {p.name} ({p.code})
                </option>
              ))}
            </select>
          </div>

          {/* Reference ID */}
          <div>
            <label className="text-3xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Reference ID / Txn ID
            </label>
            <input
              type="text"
              value={localFilters.referenceId || ''}
              onChange={(e) => handleInputChange('referenceId', e.target.value)}
              placeholder="e.g. 20251024000000000379"
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-brand-500"
            />
          </div>

          {/* API Name */}
          <div>
            <label className="text-3xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              API Endpoint / Name
            </label>
            <input
              type="text"
              value={localFilters.apiName || ''}
              onChange={(e) => handleInputChange('apiName', e.target.value)}
              placeholder="e.g. updateQRV2"
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-brand-500"
            />
          </div>

          {/* Error Code */}
          <div>
            <label className="text-3xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Error Code
            </label>
            <input
              type="text"
              value={localFilters.errorCode || ''}
              onChange={(e) => handleInputChange('errorCode', e.target.value)}
              placeholder="e.g. HTTP_504"
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-brand-500"
            />
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
        </div>
      )}
    </form>
  );
};
