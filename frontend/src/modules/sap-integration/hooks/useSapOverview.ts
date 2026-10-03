import { useQuery } from '@tanstack/react-query';
import { sapIntegrationService, IExecutiveSummaryResponse } from '../services/sapIntegration.service.js';
import { useRealtimeSocket } from '../../../hooks/useRealtimeSocket.js';

export const SAP_QUERY_KEYS = {
  EXECUTIVE_SUMMARY: (params?: Record<string, string>) => ['sap', 'executive-summary', params],
  OVERVIEW: ['sap', 'overview'],
  ORDERS: (params?: unknown) => ['sap', 'orders', params],
  ERRORS: (params?: unknown) => ['sap', 'errors', params],
  SYNC: (params?: unknown) => ['sap', 'sync', params],
  FINISHED_GOODS: (params?: unknown) => ['sap', 'finished_goods', params],
  MASTER_DATA: (params?: unknown) => ['sap', 'master_data', params]
} as const;

export interface UseSapOverviewResult {
  data?: IExecutiveSummaryResponse;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  isRealtimeConnected: boolean;
}

export const useSapOverview = (filters?: Record<string, string>): UseSapOverviewResult => {
  const { isConnected } = useRealtimeSocket('sap:overview_update', (_data: unknown) => {
    // Socket.IO telemetry hook
  });

  const query = useQuery<IExecutiveSummaryResponse, Error>({
    queryKey: SAP_QUERY_KEYS.EXECUTIVE_SUMMARY(filters),
    queryFn: () => sapIntegrationService.getExecutiveSummary(filters),
    staleTime: 30000, // 30s stale time for executive analytics
    refetchInterval: 60000 // Auto refresh every 60 seconds
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: () => {
      void query.refetch();
    },
    isRealtimeConnected: isConnected
  };
};
