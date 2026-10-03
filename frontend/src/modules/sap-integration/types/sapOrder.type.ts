export type SAPOrderStatus = 'SUCCESS' | 'WARNING' | 'FAILED' | 'PENDING' | 'UNKNOWN';

export interface ISAPOrder {
  id: string;
  plnum: string; // Order Number (PLNUM)
  materialCode: string; // Material Code
  materialDescription: string;
  vinNumber: string; // Serial Number (VIN)
  plantCode: string;
  assemblyLineCode: string;
  productionDate: string; // Production Date (YYYY-MM-DD)
  productionTime: string; // Production Time (HH:mm:ss)
  plannedQuantity: number;
  completedQuantity: number;
  sequenceNumber: number;
  status: SAPOrderStatus;
  statusMessage?: string;
  isSyncedWithERP: boolean;
  lastSyncTimestamp: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductionOrderFilters {
  startDate?: string;
  endDate?: string;
  plantCode?: string;
  assemblyLineCode?: string;
  materialCode?: string;
  plnum?: string;
  vinNumber?: string;
  status?: SAPOrderStatus | 'ALL';
  searchQuery?: string;
}

export interface ProductionOrderPagination {
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
}

export interface ProductionKPIsSummary {
  totalOrders: number;
  ordersToday: number;
  successfulOrders: number;
  failedOrders: number;
  pendingOrders: number;
  uniqueMaterials: number;
}
