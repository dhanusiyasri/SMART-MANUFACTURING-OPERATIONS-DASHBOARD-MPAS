export const APP_CONFIG = {
  CLIENT_NAME: 'Ashok Leyland',
  APP_NAME: 'Smart Manufacturing Operations Dashboard (MPAS)',
  PLANT_LOCATION: 'Plant 2004',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || 'ws://localhost:3000',
  DEFAULT_QUERY_STALE_TIME: 1000 * 30, // 30 seconds
  DEFAULT_QUERY_RETRY_COUNT: 2
} as const;
