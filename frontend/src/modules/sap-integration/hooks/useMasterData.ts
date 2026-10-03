import { useQuery } from '@tanstack/react-query';
import { sapIntegrationService, PaginatedResult } from '../services/sapIntegration.service.js';
import { useRealtimeSocket } from '../../../hooks/useRealtimeSocket.js';
import { IChildMaterial, IMaterialMaster, IMasterDataQueryParams } from '../types/index.js';
import { SAP_QUERY_KEYS } from './useSapOverview.js';

export interface UseMasterDataResult {
  data?: {
    childMaterials: PaginatedResult<IChildMaterial>;
    materialMasters: PaginatedResult<IMaterialMaster>;
  };
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  isRealtimeConnected: boolean;
}

export const useMasterData = (params?: IMasterDataQueryParams): UseMasterDataResult => {
  const { isConnected } = useRealtimeSocket('sap:master_data_update', (_data: unknown) => {
    // Socket.IO event handler for real-time SAP master data changes
  });

  const query = useQuery({
    queryKey: SAP_QUERY_KEYS.MASTER_DATA(params),
    queryFn: () => sapIntegrationService.getMasterData(params),
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
