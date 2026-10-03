import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { sapIntegrationService } from '../services/sapIntegration.service.js';
import { useRealtimeSocket } from '../../../hooks/useRealtimeSocket.js';
import {
  ISAPOrder,
  ProductionOrderFilters,
  ProductionOrderPagination,
  ProductionKPIsSummary
} from '../types/index.js';

export interface UseOrdersResult {
  orders: ISAPOrder[];
  kpis: ProductionKPIsSummary;
  loading: boolean;
  error: Error | null;
  pagination: ProductionOrderPagination;
  filters: ProductionOrderFilters;
  selectedOrder: ISAPOrder | null;
  selectedOrderIds: Set<string>;
  setSelectedOrder: (order: ISAPOrder | null) => void;
  toggleRowSelection: (id: string) => void;
  selectAllRows: (selectAll: boolean) => void;
  setFilters: (newFilters: ProductionOrderFilters) => void;
  resetFilters: () => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  refresh: () => void;
  isRealtimeConnected: boolean;
}

const defaultFilters: ProductionOrderFilters = {
  startDate: '',
  endDate: '',
  plantCode: '',
  assemblyLineCode: '',
  materialCode: '',
  plnum: '',
  vinNumber: '',
  status: 'ALL',
  searchQuery: ''
};

export const useOrders = (initialFilters?: ProductionOrderFilters): UseOrdersResult => {
  const [filters, setFiltersState] = useState<ProductionOrderFilters>({
    ...defaultFilters,
    ...initialFilters
  });
  const [page, setPageState] = useState<number>(1);
  const [limit, setLimitState] = useState<number>(10);

  // Selected Order for Detail Drawer
  const [selectedOrder, setSelectedOrderState] = useState<ISAPOrder | null>(null);

  // Multi-selection set
  const [selectedOrderIds, setSelectedOrderIds] = useState<Set<string>>(new Set());

  // Socket.IO Listener prepared for live row updates without resetting pagination state
  const { isConnected } = useRealtimeSocket('sap:order_row_update', (_updatedOrder: unknown) => {
    // Preserves pagination state and selection state during real-time row updates
  });

  const queryKey = useMemo(() => ['sap', 'orders', page, limit, filters], [page, limit, filters]);

  const query = useQuery({
    queryKey,
    queryFn: () => sapIntegrationService.getOrders({ ...filters, page, limit }),
    enabled: false // Hook structure ready for service layer data injection
  });

  const orders = useMemo(() => query.data?.data || [], [query.data]);

  const pagination = useMemo<ProductionOrderPagination>(
    () => ({
      page: query.data?.page || page,
      limit: query.data?.limit || limit,
      totalRecords: query.data?.totalCount || 0,
      totalPages: Math.ceil((query.data?.totalCount || 0) / limit) || 1
    }),
    [query.data, page, limit]
  );

  // Calculated KPIs from order data stream or service
  const kpis = useMemo<ProductionKPIsSummary>(() => {
    const total = orders.length;
    const success = orders.filter((o) => o.status === 'SUCCESS').length;
    const failed = orders.filter((o) => o.status === 'FAILED').length;
    const pending = orders.filter((o) => o.status === 'PENDING').length;
    const materials = new Set(orders.map((o) => o.materialCode)).size;

    return {
      totalOrders: query.data?.totalCount ?? total,
      ordersToday: total,
      successfulOrders: success,
      failedOrders: failed,
      pendingOrders: pending,
      uniqueMaterials: materials
    };
  }, [orders]);

  const setSelectedOrder = useCallback((order: ISAPOrder | null) => {
    setSelectedOrderState(order);
  }, []);

  const toggleRowSelection = useCallback((id: string) => {
    setSelectedOrderIds((prev) => {
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
      setSelectedOrderIds(new Set(orders.map((o) => o.id)));
    } else {
      setSelectedOrderIds(new Set());
    }
  }, [orders]);

  const setFilters = useCallback((newFilters: ProductionOrderFilters) => {
    setFiltersState(newFilters);
    setPageState(1); // Reset to page 1 on filter apply
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
    orders,
    kpis,
    loading: query.isLoading,
    error: query.error as Error | null,
    pagination,
    filters,
    selectedOrder,
    selectedOrderIds,
    setSelectedOrder,
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
