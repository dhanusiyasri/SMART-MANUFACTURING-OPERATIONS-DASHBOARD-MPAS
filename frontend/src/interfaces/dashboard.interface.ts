export interface ITotalOrdersMetrics {
  totalOrders: number;
  queriedAt?: string;
  sourceTable?: string;
}

export interface IDashboardWidgetConfig {
  id: string;
  title: string;
  refreshIntervalMs?: number;
  isRealtime?: boolean;
}

export interface ISAPSequencePlanRecord {
  id: string;
  orderNumber: string;
  materialNumber: string;
  plannedQuantity: number;
  lineId: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'HALTED';
}
