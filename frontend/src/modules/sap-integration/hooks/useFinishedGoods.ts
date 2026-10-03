import { useQuery } from '@tanstack/react-query';
import { sapIntegrationService, PaginatedResult } from '../services/sapIntegration.service.js';
import { useRealtimeSocket } from '../../../hooks/useRealtimeSocket.js';
import { IFinishedGoods, IFinishedGoodsQueryParams } from '../types/index.js';
import { SAP_QUERY_KEYS } from './useSapOverview.js';

export interface UseFinishedGoodsResult {
  data?: PaginatedResult<IFinishedGoods>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  isRealtimeConnected: boolean;
}

export const useFinishedGoods = (params?: IFinishedGoodsQueryParams): UseFinishedGoodsResult => {
  const { isConnected } = useRealtimeSocket('sap:finished_goods', (_data: unknown) => {
    // Socket.IO event handler for real-time SAP Finished Goods completion events
  });

  const query = useQuery({
    queryKey: SAP_QUERY_KEYS.FINISHED_GOODS(params),
    queryFn: () => sapIntegrationService.getFinishedGoods(params),
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
