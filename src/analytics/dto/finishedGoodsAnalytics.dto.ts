export interface IFinishedGoodsAnalyticsDTO {
  finishedGoodsTrend: {
    timeCategories: string[];
    receiptCounts: number[];
  };
  plantComparison: {
    categories: string[];
    series: {
      plantName: string;
      data: number[];
      color: string;
    }[];
  };
  stageDistribution: {
    stageName: string;
    count: number;
    color?: string;
  }[];
  materialMix: {
    name: string;
    value: number;
    children?: { name: string; value: number }[];
  }[];
  hourlyThroughput: {
    hour: string;
    unitsCount: number;
  }[];
  dispatchSummary: {
    completedDispatch: number;
    pendingDispatch: number;
    inProgressQC: number;
  };
}
