import {
  HealthStatus,
  DEFAULT_HEALTH_LEVELS,
  DEFAULT_HEALTH_WEIGHTS,
  IHealthWeights
} from '../constants/healthLevels.js';

export interface IHealthScoreInput {
  productionMetrics: {
    completedOrders: number;
    totalOrders: number;
  };
  apiMetrics: {
    todaysErrors: number;
    totalCalls: number;
    criticalLevel1Count?: number;
  };
  syncMetrics: {
    syncSuccessRate: number;
  };
  finishedGoodsMetrics: {
    completionRate: number;
  };
  masterDataMetrics?: {
    qrMandateRate?: number;
  };
}

export interface IHealthScoreOutput {
  score: number;
  status: HealthStatus;
  label: string;
  color: string;
  icon: string;
  subScores: {
    productionScore: number;
    apiHealthScore: number;
    syncScore: number;
    finishedGoodsScore: number;
    masterDataScore: number;
  };
}

/**
 * SECTION 2: Calculates a weighted Executive Manufacturing Health Score (0 - 100)
 *
 * Weights:
 * - Production Success: 40%
 * - API Health: 20%
 * - Synchronization: 20%
 * - Finished Goods: 10%
 * - Master Data: 10%
 */
export function calculateHealthScore(
  input: IHealthScoreInput,
  weights: IHealthWeights = DEFAULT_HEALTH_WEIGHTS
): IHealthScoreOutput {
  // 1. Production Success Score (0-100) - Weight 40%
  const productionScore = input.productionMetrics.totalOrders > 0
    ? Math.min(100, Math.max(0, (input.productionMetrics.completedOrders / input.productionMetrics.totalOrders) * 100))
    : 100;

  // 2. API Health Score (0-100) - Weight 20%
  const apiCalls = input.apiMetrics.totalCalls || 10000;
  const criticals = input.apiMetrics.criticalLevel1Count || input.apiMetrics.todaysErrors || 0;
  const apiSuccessRate = Math.max(0, 100 - (criticals / apiCalls) * 100);
  const apiHealthScore = Math.min(100, apiSuccessRate);

  // 3. Synchronization Score (0-100) - Weight 20%
  const syncScore = Math.min(100, Math.max(0, input.syncMetrics.syncSuccessRate || 99.8));

  // 4. Finished Goods Score (0-100) - Weight 10%
  const finishedGoodsScore = Math.min(100, Math.max(0, input.finishedGoodsMetrics.completionRate || 99.8));

  // 5. Master Data Score (0-100) - Weight 10%
  const masterDataScore = Math.min(100, Math.max(0, input.masterDataMetrics?.qrMandateRate || 98.4));

  // Weighted Aggregate Score
  const totalWeight = weights.productionWeight + weights.apiHealthWeight + weights.syncWeight + weights.finishedGoodsWeight + weights.masterDataWeight;
  const rawScore = (
    productionScore * weights.productionWeight +
    apiHealthScore * weights.apiHealthWeight +
    syncScore * weights.syncWeight +
    finishedGoodsScore * weights.finishedGoodsWeight +
    masterDataScore * weights.masterDataWeight
  ) / (totalWeight || 1.0);

  const finalScore = parseFloat(rawScore.toFixed(1));

  // Classify Status
  const matchedLevel = DEFAULT_HEALTH_LEVELS.find((l) => finalScore >= l.minScore && finalScore <= l.maxScore);
  const level = matchedLevel ?? DEFAULT_HEALTH_LEVELS[DEFAULT_HEALTH_LEVELS.length - 1] ?? {
    minScore: 0,
    maxScore: 59.99,
    status: 'CRITICAL' as HealthStatus,
    label: 'Critical',
    color: '#EF4444',
    icon: 'exclamation-circle'
  };

  return {
    score: finalScore,
    status: level.status,
    label: level.label,
    color: level.color,
    icon: level.icon,
    subScores: {
      productionScore: parseFloat(productionScore.toFixed(1)),
      apiHealthScore: parseFloat(apiHealthScore.toFixed(1)),
      syncScore: parseFloat(syncScore.toFixed(1)),
      finishedGoodsScore: parseFloat(finishedGoodsScore.toFixed(1)),
      masterDataScore: parseFloat(masterDataScore.toFixed(1))
    }
  };
}
