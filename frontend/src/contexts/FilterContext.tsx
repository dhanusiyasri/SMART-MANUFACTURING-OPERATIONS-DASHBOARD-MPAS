import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../api/axiosClient.js';

export type DateRangeOption = 'TODAY' | 'YESTERDAY' | 'THIS_WEEK' | 'THIS_MONTH' | 'CUSTOM';
export type ShiftOption = 'ALL' | 'SHIFT_A' | 'SHIFT_B' | 'SHIFT_C';

export interface IAnalyticsFilters {
  plantCode: string; // Fixed & read-only: '2004'
  lineCode: string; // 'ALL', '0101', '0201', '0203', etc.
  dateRange: DateRangeOption;
  shift: ShiftOption;
  startDate?: string;
  endDate?: string;
  // Aliases for compatibility
  plant: string;
  line: string;
}

export interface IPlantConfig {
  code: string;
  name: string;
  location?: string;
  isReadOnly?: boolean;
}

export interface IProductionLineConfig {
  code: string;
  name: string;
}

export interface IShiftConfig {
  code: string;
  name: string;
}

export interface IDateRangeConfig {
  code: string;
  name: string;
}

export interface IDashboardConfigData {
  plant: IPlantConfig;
  lines?: string[];
  productionLines: IProductionLineConfig[];
  shifts: IShiftConfig[];
  dateRanges: IDateRangeConfig[];
}

export interface IFilterContext {
  filters: IAnalyticsFilters;
  config: IDashboardConfigData;
  isLoadingConfig: boolean;
  lastRefresh: string;
  setLine: (line: string) => void;
  setDateRange: (range: DateRangeOption) => void;
  setShift: (shift: ShiftOption) => void;
  setCustomDates: (startDate: string, endDate: string) => void;
  refresh: () => void;
  resetFilters: () => void;
  queryParams: Record<string, string>;
}

const DEFAULT_PLANT_CONFIG: IPlantConfig = {
  code: '2004',
  name: 'Ashok Leyland Manufacturing Plant',
  location: 'Plant 2004',
  isReadOnly: true
};

const DEFAULT_CONFIG: IDashboardConfigData = {
  plant: DEFAULT_PLANT_CONFIG,
  lines: ['0101', '0201', '0203'],
  productionLines: [
    { code: 'ALL', name: 'ALL' },
    { code: '0101', name: '0101' },
    { code: '0201', name: '0201' },
    { code: '0203', name: '0203' }
  ],
  shifts: [
    { code: 'ALL', name: 'ALL' },
    { code: 'SHIFT_A', name: 'SHIFT_A' },
    { code: 'SHIFT_B', name: 'SHIFT_B' },
    { code: 'SHIFT_C', name: 'SHIFT_C' }
  ],
  dateRanges: [
    { code: 'TODAY', name: 'TODAY' },
    { code: 'YESTERDAY', name: 'YESTERDAY' },
    { code: 'THIS_WEEK', name: 'THIS_WEEK' },
    { code: 'THIS_MONTH', name: 'THIS_MONTH' },
    { code: 'CUSTOM', name: 'CUSTOM' }
  ]
};

const DEFAULT_FILTERS: IAnalyticsFilters = {
  plantCode: '2004',
  lineCode: 'ALL',
  plant: '2004',
  line: 'ALL',
  dateRange: 'TODAY',
  shift: 'ALL',
  startDate: '',
  endDate: ''
};

export const FilterContext = createContext<IFilterContext | undefined>(undefined);
export const AnalyticsFilterContext = FilterContext;

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const [lastRefresh, setLastRefresh] = useState<string>(() => new Date().toISOString());

  const [filters, setFilters] = useState<IAnalyticsFilters>(() => {
    try {
      const saved = localStorage.getItem('mpas_global_analytics_filters');
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<IAnalyticsFilters>;
        const plantCode = '2004';
        const lineCode = parsed.lineCode || parsed.line || 'ALL';
        return {
          ...DEFAULT_FILTERS,
          ...parsed,
          plantCode,
          plant: plantCode,
          lineCode,
          line: lineCode
        };
      }
    } catch (_e) {
      // Ignore parsing errors
    }
    return DEFAULT_FILTERS;
  });

  // Fetch dynamic plant and line configuration from GET /api/config/dashboard
  const configQuery = useQuery<{ success: boolean; data: IDashboardConfigData }>({
    queryKey: ['config', 'dashboard'],
    queryFn: async () => {
      const res = await axiosClient.get<unknown, { success: boolean; data: IDashboardConfigData }>('/config/dashboard');
      return res;
    },
    staleTime: 300000 // 5 minutes
  });

  const config = configQuery.data?.data || DEFAULT_CONFIG;

  useEffect(() => {
    try {
      localStorage.setItem('mpas_global_analytics_filters', JSON.stringify(filters));
    } catch (_e) {
      // Ignore storage errors
    }
  }, [filters]);

  const setLine = useCallback((lineCode: string) => {
    setFilters((prev) => ({
      ...prev,
      lineCode: lineCode || 'ALL',
      line: lineCode || 'ALL'
    }));
  }, []);

  const setDateRange = useCallback((dateRange: DateRangeOption) => {
    setFilters((prev) => ({ ...prev, dateRange }));
  }, []);

  const setShift = useCallback((shift: ShiftOption) => {
    setFilters((prev) => ({ ...prev, shift }));
  }, []);

  const setCustomDates = useCallback((startDate: string, endDate: string) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: 'CUSTOM',
      startDate,
      endDate
    }));
  }, []);

  const refresh = useCallback(() => {
    setLastRefresh(new Date().toISOString());
    void queryClient.invalidateQueries({ queryKey: ['sap'] });
  }, [queryClient]);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    try {
      localStorage.removeItem('mpas_global_analytics_filters');
    } catch (_e) {
      // Ignore storage errors
    }
  }, []);

  // Convert filter state to canonical URL query parameters:
  // ?plantCode=2004&lineCode=0201&shift=...&fromDate=...&toDate=...
  const queryParams = useMemo(() => {
    const params: Record<string, string> = {
      plantCode: '2004'
    };

    if (filters.lineCode && filters.lineCode !== 'ALL') {
      params.lineCode = filters.lineCode;
    }

    if (filters.shift && filters.shift !== 'ALL') {
      params.shift = filters.shift;
    }

    if (filters.dateRange === 'CUSTOM' && filters.startDate && filters.endDate) {
      params.fromDate = filters.startDate;
      params.toDate = filters.endDate;
    }

    return params;
  }, [filters]);

  return (
    <FilterContext.Provider
      value={{
        filters,
        config,
        isLoadingConfig: configQuery.isLoading,
        lastRefresh,
        setLine,
        setDateRange,
        setShift,
        setCustomDates,
        refresh,
        resetFilters,
        queryParams
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useAnalyticsFilter = (): IFilterContext => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useAnalyticsFilter must be used within a FilterProvider');
  }
  return context;
};

export const useAnalyticsFilterContext = useAnalyticsFilter;
