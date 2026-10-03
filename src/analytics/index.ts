/**
 * Enterprise Analytics Engine for Ashok Leyland MPAS
 * Shared calculations, rule-based insights, health score calculators, and metadata builders.
 */

// Constants
export * from './constants/healthLevels.js';
export * from './constants/colors.js';

// Utils
export * from './utils/dateHelpers.js';
export * from './utils/formatting.js';

// DTOs
export * from './dto/analyticsResponse.dto.js';
export * from './dto/executiveSummary.dto.js';
export * from './dto/productionAnalytics.dto.js';
export * from './dto/apiIntelligence.dto.js';
export * from './dto/synchronizationAnalytics.dto.js';
export * from './dto/finishedGoodsAnalytics.dto.js';
export * from './dto/masterDataAnalytics.dto.js';
export * from './dto/analyticsFilter.dto.js';

// Calculators
export * from './calculators/healthScoreCalculator.js';
export * from './calculators/trendCalculator.js';
export * from './calculators/percentageCalculator.js';
export * from './calculators/comparisonCalculator.js';
export * from './calculators/statisticsCalculator.js';

// Insights Engine
export * from './insights/executiveInsights.js';
export * from './insights/productionInsights.js';
export * from './insights/apiInsights.js';
export * from './insights/synchronizationInsights.js';
export * from './insights/finishedGoodsInsights.js';
export * from './insights/masterDataInsights.js';

// Metadata
export * from './metadata/metadataBuilder.js';

// Core Service & Controller Exports
export * from './services/analytics.service.js';
export * from './repositories/analytics.repository.js';
export * from './controllers/analytics.controller.js';
export * from './routes/analytics.routes.js';
