import React from 'react';
import { useAnalyticsFilter, DateRangeOption, ShiftOption } from '../../../../contexts/FilterContext.js';
import { Button } from '../../../../components/common/Button.js';
import { Badge } from '../../../../components/common/Badge.js';
import { HiOutlineAdjustments, HiOutlineRefresh, HiOutlineLockClosed } from '../../../../icons/index.js';

export const AnalyticsFilterRibbon: React.FC = () => {
  const {
    filters,
    config,
    isLoadingConfig,
    setLine,
    setDateRange,
    setShift,
    setCustomDates,
    resetFilters
  } = useAnalyticsFilter();

  const handleCustomDateChange = (start: string, end: string) => {
    setCustomDates(start, end);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs sticky top-16 z-20 space-y-2">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
        {/* Plant Badge (Read-Only Plant 2004 - Part 2 Specification) */}
        <div className="flex items-center space-x-2 shrink-0">
          <Badge variant="blue" className="py-1 px-2.5 flex items-center space-x-1.5 font-bold font-mono">
            <HiOutlineLockClosed className="w-3.5 h-3.5 text-brand-600 shrink-0" />
            <span>🏭 Plant : {config.plant.code}</span>
          </Badge>
          {isLoadingConfig && (
            <span className="text-3xs font-medium text-slate-400 animate-pulse">Syncing DB config...</span>
          )}
        </div>

        {/* Filter Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Production Line Selector */}
          <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-semibold">
            <span className="text-3xs text-slate-400 font-mono uppercase tracking-wider block mr-1">LINE</span>
            <select
              value={filters.lineCode}
              onChange={(e) => setLine(e.target.value)}
              className="bg-transparent focus:outline-hidden cursor-pointer text-xs font-bold text-slate-800 font-mono"
            >
              {config.productionLines.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Selector */}
          <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-semibold">
            <HiOutlineAdjustments className="w-3.5 h-3.5 text-slate-400 mr-1" />
            <select
              value={filters.dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRangeOption)}
              className="bg-transparent focus:outline-hidden cursor-pointer text-xs font-bold text-slate-800 font-mono"
            >
              {config.dateRanges.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Date Range Inputs */}
          {filters.dateRange === 'CUSTOM' && (
            <div className="flex items-center space-x-1.5 bg-brand-50 border border-brand-200 rounded-lg px-2 py-1">
              <input
                type="date"
                value={filters.startDate || ''}
                onChange={(e) => handleCustomDateChange(e.target.value, filters.endDate || '')}
                className="bg-white border border-slate-200 rounded-md text-3xs font-mono p-1"
              />
              <span className="text-3xs text-slate-400">to</span>
              <input
                type="date"
                value={filters.endDate || ''}
                onChange={(e) => handleCustomDateChange(filters.startDate || '', e.target.value)}
                className="bg-white border border-slate-200 rounded-md text-3xs font-mono p-1"
              />
            </div>
          )}

          {/* Shift Selector */}
          <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-semibold">
            <span className="text-3xs text-slate-400 font-mono uppercase tracking-wider block mr-1">SHIFT</span>
            <select
              value={filters.shift}
              onChange={(e) => setShift(e.target.value as ShiftOption)}
              className="bg-transparent focus:outline-hidden cursor-pointer text-xs font-bold text-slate-800 font-mono"
            >
              {config.shifts.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            icon={<HiOutlineRefresh className="w-3.5 h-3.5" />}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
