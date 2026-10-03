export * from './sapOrder.type.js';
export * from './apiErrorLog.type.js';
export * from './synchronizationLog.type.js';
export * from './finishedGoods.type.js';
export * from './masterData.type.js';

export interface ISapOverviewSummary {
  totalOrdersCount: number;
  unresolvedApiErrorsCount: number;
  successfulSyncCount: number;
  finishedGoodsTodayCount: number;
  masterDataRecordsCount: number;
  lastSapSyncTimestamp: string;
}
