import React, { useState } from 'react';
import { HiOutlineSearch, HiOutlineAdjustments, HiOutlineRefresh } from '../../../icons/index.js';

interface SapFilterBarProps {
  onSearchChange?: (query: string) => void;
  onRefresh?: () => void;
}

export const SapFilterBar: React.FC<SapFilterBarProps> = ({ onSearchChange, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('today');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleSearch = (val: string) => {
    setSearchTerm(val);
    if (onSearchChange) onSearchChange(val);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <HiOutlineSearch className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Filter by Order #, VIN, Material Code, or Error Transaction ID..."
          className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
          aria-label="Filter SAP records"
        />
      </div>

      {/* Dropdown Filters & Actions */}
      <div className="flex items-center space-x-2.5">
        {/* Date Range Select */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-600 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5">
          <HiOutlineAdjustments className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-transparent font-medium focus:outline-hidden cursor-pointer"
            aria-label="Filter by Date Range"
          >
            <option value="today">Today's Shift</option>
            <option value="last_24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>

        {/* Status Select */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-600 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent font-medium focus:outline-hidden cursor-pointer"
            aria-label="Filter by Status"
          >
            <option value="all">All Statuses</option>
            <option value="success">Success / Synced</option>
            <option value="pending">Pending</option>
            <option value="error">Errors / Failed</option>
          </select>
        </div>

        {/* Refresh Action Button */}
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-1.5 bg-white hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 transition-colors"
            title="Refresh SAP Data"
            aria-label="Refresh Data"
          >
            <HiOutlineRefresh className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
