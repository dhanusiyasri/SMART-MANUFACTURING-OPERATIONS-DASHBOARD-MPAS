import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { sapIntegrationService } from '../services/sapIntegration.service.js';
import { useRealtimeSocket } from '../../../hooks/useRealtimeSocket.js';
import {
  IApiErrorLog,
  ApiErrorFilters,
  ApiErrorPagination,
  ApiErrorKPIsSummary
} from '../types/index.js';

export interface UseApiErrorsResult {
  errors: IApiErrorLog[];
  kpis: ApiErrorKPIsSummary;
  loading: boolean;
  error: Error | null;
  pagination: ApiErrorPagination;
  filters: ApiErrorFilters;
  selectedError: IApiErrorLog | null;
  selectedErrorIds: Set<string>;
  setSelectedError: (err: IApiErrorLog | null) => void;
  toggleRowSelection: (id: string) => void;
  selectAllRows: (selectAll: boolean) => void;
  setFilters: (newFilters: ApiErrorFilters) => void;
  resetFilters: () => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  refresh: () => void;
  isRealtimeConnected: boolean;
}

const defaultFilters: ApiErrorFilters = {
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

export const useApiErrors = (initialFilters?: ApiErrorFilters): UseApiErrorsResult => {
  const [filters, setFiltersState] = useState<ApiErrorFilters>({
    ...defaultFilters,
    ...initialFilters
  });
  const [page, setPageState] = useState<number>(1);
  const [limit, setLimitState] = useState<number>(10);

  // Selected Error for Detail Drawer
  const [selectedError, setSelectedErrorState] = useState<IApiErrorLog | null>(null);

  // Multi-selection set
  const [selectedErrorIds, setSelectedErrorIds] = useState<Set<string>>(new Set());

  // Socket.IO Listener
  const { isConnected } = useRealtimeSocket('sap:api_error_live', (_newError: unknown) => {
    // Live error socket listener
  });

  const queryKey = useMemo(() => ['sap', 'api_errors', page, limit, filters], [page, limit, filters]);

  const query = useQuery({
    queryKey,
    queryFn: () => sapIntegrationService.getApiErrors({ ...filters, page, limit }),
    enabled: true
  });

  const errors = useMemo(() => query.data?.data || [], [query.data]);

  const pagination = useMemo<ApiErrorPagination>(
    () => ({
      page: query.data?.page || page,
      limit: query.data?.limit || limit,
      totalRecords: query.data?.totalCount ?? 0,
      totalPages: Math.ceil((query.data?.totalCount ?? 0) / limit) || 1
    }),
    [query.data, page, limit]
  );

  // KPI Calculations
  const kpis = useMemo<ApiErrorKPIsSummary>(() => {
    const total = errors.length;
    const critical = errors.filter((e) => e.criticalLevel === 'LEVEL_1').length;
    const timeout = errors.filter((e) => e.errorCode === 'HTTP_504' || e.errorCode === 'ETIMEDOUT').length;
    const resolved = errors.filter((e) => e.status === 'RESOLVED').length;
    const pending = errors.filter((e) => e.status === 'PENDING').length;
    const uniqueApis = new Set(errors.map((e) => e.apiName)).size;

    return {
      totalErrors: query.data?.totalCount ?? total,
      criticalErrors: critical,
      timeoutErrors: timeout,
      resolvedErrors: resolved,
      pendingErrors: pending,
      uniqueApisWithErrors: uniqueApis
    };
  }, [errors, query.data]);

  const setSelectedError = useCallback((err: IApiErrorLog | null) => {
    setSelectedErrorState(err);
  }, []);

  const toggleRowSelection = useCallback((id: string) => {
    setSelectedErrorIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const selectAllRows = useCallback((selectAll: boolean) => {
    if (selectAll) {
      setSelectedErrorIds(new Set(errors.map((e) => e.id)));
    } else {
      setSelectedErrorIds(new Set());
    }
  }, [errors]);

  const setFilters = useCallback((newFilters: ApiErrorFilters) => {
    setFiltersState(newFilters);
    setPageState(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(defaultFilters);
    setPageState(1);
  }, []);

  const setPage = useCallback((newPage: number) => {
    setPageState(newPage);
  }, []);

  const setLimit = useCallback((newLimit: number) => {
    setLimitState(newLimit);
    setPageState(1);
  }, []);

  const refresh = useCallback(() => {
    void query.refetch();
  }, [query]);

  return {
    errors,
    kpis,
    loading: query.isLoading,
    error: query.error as Error | null,
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
    isRealtimeConnected: isConnected
  };
};
