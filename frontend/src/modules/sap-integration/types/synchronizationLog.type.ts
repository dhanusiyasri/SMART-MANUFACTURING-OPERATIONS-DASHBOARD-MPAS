export type SyncSource = 'SAP_ERP' | 'MES_DATABASE' | 'LINE_PLC' | 'BATCH_JOB';

export type SyncStatus = 'SUCCESS' | 'PARTIAL_SUCCESS' | 'FAILED' | 'IN_PROGRESS';

export interface ISynchronizationLog {
  id: string;
  batchId: string;
  source: SyncSource;
  targetTable: string;
  recordsFound: number;
  recordsProcessed: number;
  recordsFailed: number;
  syncDurationMs: number;
  status: SyncStatus;
  executionTimestamp: string;
  plantCode: string;
  details?: string;
}

export interface ISyncQueryParams {
  source?: SyncSource;
  status?: SyncStatus;
  targetTable?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}
