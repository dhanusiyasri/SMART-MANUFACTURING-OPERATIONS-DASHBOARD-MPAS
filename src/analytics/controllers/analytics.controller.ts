import { Request, Response, NextFunction } from 'express';
import { analyticsService, IAnalyticsService } from '../services/analytics.service.js';
import { IAnalyticsFilterDTO } from '../dto/analyticsFilter.dto.js';
import { logger } from '../../config/logger.config.js';

export class AnalyticsController {

  /**
   * GET /api/analytics/order-traceability/:orderNumber
   * Unified 360° Order Traceability across 6 SQL tables
   */
  
  /**
   * GET /api/analytics/command-center
   * Real-time Operational Command Center Stream
   */
  
  public getRootCauseAnalysis = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info('HTTP GET /api/analytics/root-cause requested');
      const filters = req.query as unknown as IAnalyticsFilterDTO;
      const data = await this.service.getRootCauseAnalysis(filters);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  public getCommandCenterData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters = req.query as unknown as IAnalyticsFilterDTO;
      const data = await this.service.getCommandCenterData(filters);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  public getOrderTraceability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const orderNumber = req.params.orderNumber || (req.query.orderNo as string) || 'PL-94820';
      logger.info(`HTTP GET /api/analytics/order-traceability/${orderNumber}`);

      const data = await this.service.getOrderTraceability(orderNumber);
      res.status(200).json(data);
    } catch (error) {
      logger.error('AnalyticsController.getOrderTraceability error', error);
      next(error);
    }
  };

  private service: IAnalyticsService;

  constructor(service: IAnalyticsService = analyticsService) {
    this.service = service;
  }

  /**
   * @openapi
   * /api/analytics/executive-summary:
   *   get:
   *     tags:
   *       - Analytics
   *     summary: Get Executive Integration Summary KPIs
   */
  public getExecutiveSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters = req.query as unknown as IAnalyticsFilterDTO;
      logger.info(`HTTP GET /api/analytics/executive-summary parameters: ${JSON.stringify(filters)}`);

      const response = await this.service.getExecutiveSummary(filters);
      res.status(200).json(response);
    } catch (error) {
      logger.error('AnalyticsController.getExecutiveSummary HTTP handler error', error);
      next(error);
    }
  };

  /**
   * @openapi
   * /api/analytics/production:
   *   get:
   *     tags:
   *       - Analytics
   *     summary: Production Sequence & Volume Analytics (SAP_ZPP_SEQ_PLAN)
   */
  public getProductionAnalytics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters = req.query as unknown as IAnalyticsFilterDTO;
      logger.info(`HTTP GET /api/analytics/production parameters: ${JSON.stringify(filters)}`);

      const response = await this.service.getProductionAnalytics(filters);
      res.status(200).json(response);
    } catch (error) {
      logger.error('AnalyticsController.getProductionAnalytics HTTP handler error', error);
      next(error);
    }
  };

  /**
   * @openapi
   * /api/analytics/api-intelligence:
   *   get:
   *     tags:
   *       - Analytics
   *     summary: API Exception & Health Intelligence (SAP_API_ERROR_LOG)
   */
  public getApiIntelligence = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters = req.query as unknown as IAnalyticsFilterDTO;
      logger.info(`HTTP GET /api/analytics/api-intelligence parameters: ${JSON.stringify(filters)}`);

      const response = await this.service.getApiIntelligence(filters);
      res.status(200).json(response);
    } catch (error) {
      logger.error('AnalyticsController.getApiIntelligence HTTP handler error', error);
      next(error);
    }
  };

  /**
   * @openapi
   * /api/analytics/synchronization:
   *   get:
   *     tags:
   *       - Analytics
   *     summary: ERP Synchronization Telemetry & Throughput Analytics (SAP_DATA_FOUND_LOG)
   *     description: Aggregates 4.7M+ sync records returning throughput KPIs, volume trends, API throughput, plant/line comparisons, hourly throughput, API heatmaps, latest activity, and insights.
   */
  public getSynchronizationAnalytics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters = req.query as unknown as IAnalyticsFilterDTO;
      logger.info(`HTTP GET /api/analytics/synchronization parameters: ${JSON.stringify(filters)}`);

      const response = await this.service.getSynchronizationAnalytics(filters);
      res.status(200).json(response);
    } catch (error) {
      logger.error('AnalyticsController.getSynchronizationAnalytics HTTP handler error', error);
      next(error);
    }
  };

  /**
   * GET /api/analytics/finished-goods
   */
  public getFinishedGoodsAnalytics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters = req.query as unknown as IAnalyticsFilterDTO;
      const data = await this.service.getFinishedGoodsAnalytics(filters);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/analytics/master-data
   */
  public getMasterDataAnalytics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters = req.query as unknown as IAnalyticsFilterDTO;
      const data = await this.service.getMasterDataAnalytics(filters);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };
}

export const analyticsController = new AnalyticsController();
