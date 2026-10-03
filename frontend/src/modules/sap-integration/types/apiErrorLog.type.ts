export type CriticalLevel = 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'UNKNOWN';

export type ApiProcessingStatus = 'PENDING' | 'RESOLVED' | 'RETRYING' | 'FAILED' | 'SUCCESS';

export interface IApiErrorLog {
  id: string;
  apiName: string; // API Name / Endpoint
  plantCode: string;
  assemblyLineCode: string;
  referenceId: string; // Reference ID / Transaction ID
  errorCode: string;
  errorMessage: string;
  detailedDescription?: string; // Detailed Error Description / Stack Trace
  criticalLevel: CriticalLevel; // Level 1 (Red), Level 2 (Amber), Level 3 (Blue), Unknown (Gray)
  errorFrequencyCount?: number;
  status: ApiProcessingStatus;
  timestamp: string; // Timestamp
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}

export interface ApiErrorFilters {
  startDate?: string;
  endDate?: string;
  plantCode?: string;
  assemblyLineCode?: string;
  apiName?: string;
  criticalLevel?: CriticalLevel | 'ALL';
  errorCode?: string;
  status?: ApiProcessingStatus | 'ALL';
  referenceId?: string;
  searchQuery?: string;
}

export interface ApiErrorPagination {
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
}

export interface ApiErrorKPIsSummary {
  totalErrors: number;
  criticalErrors: number;
  timeoutErrors: number;
  resolvedErrors: number;
  pendingErrors: number;
  uniqueApisWithErrors: number;
}
