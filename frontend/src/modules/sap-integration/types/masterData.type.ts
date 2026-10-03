export interface IChildMaterial {
  id: string;
  childMaterialCode: string;
  childMaterialDescription: string;
  parentMaterialCode: string;
  quantityPerParent: number;
  unitOfMeasure: string;
  supplierCode?: string;
  supplierName?: string;
  storageLocation: string;
  isCriticalComponent: boolean;
  lastUpdatedInSAP: string;
}

export interface IMaterialMaster {
  id: string;
  materialCode: string;
  materialDescription: string;
  materialGroup: string;
  materialType: string; // e.g. FERT (Finished), HALB (Semi), ROH (Raw)
  baseUnitOfMeasure: string;
  plantCode: string;
  safetyStockLevel: number;
  currentStockLevel: number;
  reorderPoint: number;
  isActiveInSAP: boolean;
  lastSyncDate: string;
}

export interface IMasterDataQueryParams {
  materialType?: string;
  searchCode?: string;
  plantCode?: string;
  page?: number;
  limit?: number;
}
