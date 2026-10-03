export type EnvironmentMode = 'development' | 'production' | 'test';

export type DatabaseStatus = 'connected' | 'disconnected' | 'error';

export type HealthStatus = 'healthy' | 'degraded' | 'unhealthy';

export interface StandardApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface HealthApiResponse {
  status: HealthStatus;
  database: DatabaseStatus;
}
