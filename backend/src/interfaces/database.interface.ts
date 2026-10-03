import { DatabaseStatus } from '../types/index.js';

export interface IDatabaseHealth {
  status: DatabaseStatus;
  isConnected: boolean;
  server: string;
  database: string;
  responseTimeMs: number;
  message?: string;
}

export interface ISQLQueryExecutor {
  query<T>(sql: string): Promise<T[]>;
}
