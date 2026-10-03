/**
 * Health Score Status Classification Enum/Types
 */
export type HealthStatus = 'EXCELLENT' | 'GOOD' | 'NEEDS_ATTENTION' | 'CRITICAL';

export interface IHealthLevelConfig {
  minScore: number;
  maxScore: number;
  status: HealthStatus;
  label: string;
  color: string;
  icon: string;
}

/**
 * SECTION 2: Executive Manufacturing Health Score Threshold Definitions
 * Range: 0 - 100
 */
export const DEFAULT_HEALTH_LEVELS: IHealthLevelConfig[] = [
  {
    minScore: 90,
    maxScore: 100,
    status: 'EXCELLENT',
    label: 'Excellent',
    color: '#10B981', // Emerald Green
    icon: 'check-circle'
  },
  {
    minScore: 75,
    maxScore: 89.99,
    status: 'GOOD',
    label: 'Good',
    color: '#2563EB', // Royal Blue
    icon: 'information-circle'
  },
  {
    minScore: 60,
    maxScore: 74.99,
    status: 'NEEDS_ATTENTION',
    label: 'Needs Attention',
    color: '#F59E0B', // Amber Yellow
    icon: 'exclamation-triangle'
  },
  {
    minScore: 0,
    maxScore: 59.99,
    status: 'CRITICAL',
    label: 'Critical',
    color: '#EF4444', // Red
    icon: 'exclamation-circle'
  }
];

/**
 * SECTION 2 Weights for weighted Executive Health Score:
 * Production Success: 40% (0.40)
 * API Health: 20% (0.20)
 * Synchronization: 20% (0.20)
 * Finished Goods: 10% (0.10)
 * Master Data: 10% (0.10)
 */
export interface IHealthWeights {
  productionWeight: number;
  apiHealthWeight: number;
  syncWeight: number;
  finishedGoodsWeight: number;
  masterDataWeight: number;
}

export const DEFAULT_HEALTH_WEIGHTS: IHealthWeights = {
  productionWeight: 0.40,
  apiHealthWeight: 0.20,
  syncWeight: 0.20,
  finishedGoodsWeight: 0.10,
  masterDataWeight: 0.10
};
