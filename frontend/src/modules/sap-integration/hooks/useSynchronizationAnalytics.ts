import { useQuery } from '@tanstack/react-query';
import { sapIntegrationService, ISynchronizationAnalyticsResponse } from '../services/sapIntegration.service.js';
import { useRealtimeSocket } from '../../../hooks/useRealtimeSocket.js';

export const SYNCHRONIZATION_ANALYTICS_QUERY_KEY = (filters?: Record<string, string>) => [
  'sap',
  'analytics',
  'synchronization',
  filters
];

export interface UseSynchronizationAnalyticsResult {
  data?: ISynchronizationAnalyticsResponse;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  isRealtimeConnected: boolean;
}

export const useSynchronizationAnalytics = (filters?: Record<string, string>): UseSynchronizationAnalyticsResult => {
  const { isConnected } = useRealtimeSocket('sap:sync_update', (_data: unknown) => {
    // Live socket updates hook
  });

  const query = useQuery<ISynchronizationAnalyticsResponse, Error>({
    queryKey: SYNCHRONIZATION_ANALYTICS_QUERY_KEY(filters),
    queryFn: () => sapIntegrationService.getSynchronizationAnalytics(filters),
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
