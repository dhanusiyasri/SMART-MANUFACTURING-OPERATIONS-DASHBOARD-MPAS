export interface IProductionKpis {
  totalOrders: number;
  todaysOrders: number;
  completedOrders: number;
  pendingOrders: number;
  failedOrders: number;
  uniqueMaterials: number;
  activeLines: number;
}

export interface IProductionTrend {
  timeCategories: string[];
  series: {
    lineName: string;
    data: number[];
    color?: string;
  }[];
}

export interface IPlantPerformance {
  plantName: string;
  orderCount: number;
}

export interface ILinePerformance {
  lineCode: string;
  orderCount: number;
}

export interface IMaterialTreeNode {
  name: string;
  value: number;
  children?: { name: string; value: number }[];
}

export interface ITopMaterialItem {
  materialCode: string;
  materialDescription: string;
  ordersCount: number;
  plantCode: string;
  lineCode: string;
  productionShare: number;
  lineRank?: number;
  trendStatus: string;
}

export interface IStatusDistributionItem {
  statusName: string;
  count: number;
  color?: string;
}

export interface IHourlyHeatmap {
  hours: string[];
  lines: string[];
  matrix: [number, number, number][];
}

export interface ILatestProductionOrder {
  plnum: string;
  materialCode: string;
  materialDescription: string;
  vinNumber: string;
  plantCode: string;
  lineCode: string;
  status: string;
  createdTime: string;
}

export interface IProductionInsight {
  id: string;
  title: string;
  description: string;
  recommendation: string;
  severity: 'OPTIMIZATION' | 'INFO' | 'WARNING' | 'CRITICAL';
}

export interface IProductionMetadata {
  generatedAt: string;
  dataFreshness: 'REALTIME' | 'NEAR_REALTIME' | 'CACHED';
  executionTimeMs?: number;
}

export interface IProductionAnalyticsResponseDTO {
  kpis: IProductionKpis;
  productionTrend: IProductionTrend;
  plantPerformance: IPlantPerformance[];
  linePerformance: ILinePerformance[];
  materialDistribution: IMaterialTreeNode[];
  topMaterials: ITopMaterialItem[];
  statusDistribution: IStatusDistributionItem[];
  hourlyHeatmap: IHourlyHeatmap;
  latestOrders: ILatestProductionOrder[];
  insights: IProductionInsight[];
  metadata: IProductionMetadata;
}
