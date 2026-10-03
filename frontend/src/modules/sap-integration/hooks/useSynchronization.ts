import { useQuery } from '@tanstack/react-query';
import { sapIntegrationService, PaginatedResult } from '../services/sapIntegration.service.js';
import { useRealtimeSocket } from '../../../hooks/useRealtimeSocket.js';
import { ISynchronizationLog, ISyncQueryParams } from '../types/index.js';
import { SAP_QUERY_KEYS } from './useSapOverview.js';

export interface UseSynchronizationResult {
  data?: PaginatedResult<ISynchronizationLog>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  isRealtimeConnected: boolean;
}

export const useSynchronization = (params?: ISyncQueryParams): UseSynchronizationResult => {
  const { isConnected } = useRealtimeSocket('sap:sync_event', (_data: unknown) => {
    // Socket.IO event handler for real-time SAP data synchronization logs
  });

  const query = useQuery({
    queryKey: SAP_QUERY_KEYS.SYNC(params),
    queryFn: () => sapIntegrationService.getSynchronization(params),
    enabled: false
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
    refetch: () => {
      void query.refetch();
    },
    isRealtimeConnected: isConnected
  };
};
