import { useQuery } from '@tanstack/react-query';
import { sapIntegrationService, IProductionAnalyticsResponse } from '../services/sapIntegration.service.js';
import { useRealtimeSocket } from '../../../hooks/useRealtimeSocket.js';

export const PRODUCTION_ANALYTICS_QUERY_KEY = (filters?: Record<string, string>) => [
  'sap',
  'analytics',
  'production',
  filters
];

export interface UseProductionAnalyticsResult {
  data?: IProductionAnalyticsResponse;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  isRealtimeConnected: boolean;
}

export const useProductionAnalytics = (filters?: Record<string, string>): UseProductionAnalyticsResult => {
  const { isConnected } = useRealtimeSocket('sap:production_update', (_data: unknown) => {
    // Live socket updates hook
  });

  const query = useQuery<IProductionAnalyticsResponse, Error>({
    queryKey: PRODUCTION_ANALYTICS_QUERY_KEY(filters),
    queryFn: () => sapIntegrationService.getProductionAnalytics(filters),
    staleTime: 30000,
    refetchInterval: 60000
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
