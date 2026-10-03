import { useQuery } from '@tanstack/react-query';
import { sapIntegrationService, IApiIntelligenceResponse } from '../services/sapIntegration.service.js';
import { useRealtimeSocket } from '../../../hooks/useRealtimeSocket.js';

export const API_INTELLIGENCE_QUERY_KEY = (filters?: Record<string, string>) => [
  'sap',
  'analytics',
  'api-intelligence',
  filters
];

export interface UseApiIntelligenceResult {
  data?: IApiIntelligenceResponse;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  isRealtimeConnected: boolean;
}

export const useApiIntelligence = (filters?: Record<string, string>): UseApiIntelligenceResult => {
  const { isConnected } = useRealtimeSocket('sap:api_error_update', (_data: unknown) => {
    // Live socket updates hook
  });

  const query = useQuery<IApiIntelligenceResponse, Error>({
    queryKey: API_INTELLIGENCE_QUERY_KEY(filters),
    queryFn: () => sapIntegrationService.getApiIntelligence(filters),
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
