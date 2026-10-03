export interface IMasterDataAnalyticsDTO {
  materialCategories: {
    categoryName: string;
    skusCount: number;
    color?: string;
  }[];
  componentCategories: {
    componentName: string;
    dependencyCount: number;
  }[];
  topMaterials: {
    materialCode: string;
    materialName: string;
    usageCount: number;
  }[];
  masterDataSummary: {
    totalChildMaterials: number;
    totalMaterialMasters: number;
    activeBomRulesCount: number;
    lastSyncedAt: string;
  };
}
