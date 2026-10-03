export type FinishedGoodsQualityState = 'APPROVED' | 'PENDING_INSPECTION' | 'REJECTED' | 'QUARANTINE';

export interface IFinishedGoods {
  id: string;
  vinNumber: string;
  modelCode: string;
  modelDescription: string;
  engineSerialNumber: string;
  chassisSerialNumber: string;
  sapOrderNumber: string;
  qualityState: FinishedGoodsQualityState;
  assemblyLineCode: string;
  plantCode: string;
  completionTimestamp: string;
  sapMovementType: string; // e.g. 101 Goods Receipt
  sapDocNumber?: string;
  isPDICompleted: boolean;
  createdAt: string;
}

export interface IFinishedGoodsQueryParams {
  qualityState?: FinishedGoodsQualityState;
  plantCode?: string;
  lineCode?: string;
  searchVin?: string;
  page?: number;
  limit?: number;
}
