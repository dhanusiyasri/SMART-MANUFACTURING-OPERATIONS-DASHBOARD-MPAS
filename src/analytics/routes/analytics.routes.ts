import { Router } from 'express';
import { analyticsController } from '../controllers/analytics.controller.js';
import { validateAnalyticsQuery } from '../validators/analyticsQuery.validator.js';

const router = Router();

/**
 * @openapi
 * /api/analytics/executive-summary:
 *   get:
 *     tags:
 *       - Analytics
 *     summary: Aggregated Executive Integration Overview
 *     description: Main endpoint returning unified metrics across production, API errors, sync logs, finished goods, and master data.
 */
router.get('/executive-summary', validateAnalyticsQuery, analyticsController.getExecutiveSummary);

/**
 * @openapi
 * /api/analytics/production:
 *   get:
 *     tags:
 *       - Analytics
 *     summary: Production Analytics (SAP_ZPP_SEQ_PLAN)
 */
router.get('/production', validateAnalyticsQuery, analyticsController.getProductionAnalytics);

/**
 * @openapi
 * /api/analytics/api-intelligence:
 *   get:
 *     tags:
 *       - Analytics
 *     summary: API Exception Intelligence (SAP_API_ERROR_LOG)
 */
router.get('/api-intelligence', validateAnalyticsQuery, analyticsController.getApiIntelligence);

/**
 * @openapi
 * /api/analytics/synchronization:
 *   get:
 *     tags:
 *       - Analytics
 *     summary: Synchronization Performance Analytics (SAP_DATA_FOUND_LOG)
 */
router.get('/synchronization', validateAnalyticsQuery, analyticsController.getSynchronizationAnalytics);

/**
 * @openapi
 * /api/analytics/finished-goods:
 *   get:
 *     tags:
 *       - Analytics
 *     summary: Finished Goods Logistics Analytics (SAP_FG)
 */
router.get('/finished-goods', validateAnalyticsQuery, analyticsController.getFinishedGoodsAnalytics);

/**
 * @openapi
 * /api/analytics/master-data:
 *   get:
 *     tags:
 *       - Analytics
 *     summary: Master Data Analytics (SAP_CHILD_MASTER & SAP_CBN_MASTER)
 */
router.get('/master-data', validateAnalyticsQuery, analyticsController.getMasterDataAnalytics);


/**
 * @openapi
 * /api/analytics/order-traceability/:orderNumber:
 *   get:
 *     tags:
 *       - Analytics
 *     summary: Order 360 Traceability across 6 SQL Tables
 */
router.get('/root-cause', validateAnalyticsQuery, analyticsController.getRootCauseAnalysis);
router.get('/command-center', validateAnalyticsQuery, analyticsController.getCommandCenterData);
router.get('/order-traceability/:orderNumber?', analyticsController.getOrderTraceability);
router.get('/order-traceability', analyticsController.getOrderTraceability);

export const analyticsRoutes = router;
