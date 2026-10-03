import { useQuery, useQueryClient } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service.js';
import { APP_CONFIG } from '../config/app.config.js';

export const QUERY_KEYS = {
  DASHBOARD_TEST: ['dashboard', 'test_metrics'],
  HEALTH: ['health', 'status'],
  SAP_PLANS: ['sap', 'sequence_plans']
} as const;

export const useDashboardTestQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.DASHBOARD_TEST,
    queryFn: () => dashboardService.getTestMetrics(),
    staleTime: APP_CONFIG.DEFAULT_QUERY_STALE_TIME,
    refetchOnWindowFocus: false
  });
};

export const useHealthCheckQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.HEALTH,
    queryFn: () => dashboardService.getHealthStatus(),
    refetchInterval: 15000 // Refresh health status every 15s
  });
};

export const useRefreshWidget = () => {
  const queryClient = useQueryClient();
  return (queryKey: readonly string[]) => {
    void queryClient.invalidateQueries({ queryKey });
  };
};
