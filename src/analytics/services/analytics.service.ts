import { IOrderTraceabilityResponseDTO } from '../dto/orderTraceability.dto.js';
import { analyticsRepository, IAnalyticsRepository } from '../repositories/analytics.repository.js';
import { IAnalyticsFilterDTO, normalizeAnalyticsFilters } from '../dto/analyticsFilter.dto.js';
import { IExecutiveSummaryResponseDTO } from '../dto/executiveSummary.dto.js';
import { IProductionAnalyticsResponseDTO } from '../dto/productionAnalytics.dto.js';
import { IApiIntelligenceResponseDTO } from '../dto/apiIntelligence.dto.js';
import { ISynchronizationAnalyticsResponseDTO } from '../dto/synchronizationAnalytics.dto.js';
import { IFinishedGoodsAnalyticsDTO } from '../dto/finishedGoodsAnalytics.dto.js';
import { IMasterDataAnalyticsDTO } from '../dto/masterDataAnalytics.dto.js';
import { logger } from '../../config/logger.config.js';

export interface IRedisCacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
}

export interface ISocketAnalyticsEmitter {
  emitEvent(eventName: string, data: unknown): void;
}

export interface IAnalyticsService {
  getOrderTraceability(orderNumber: string): Promise<IOrderTraceabilityResponseDTO>;
  getCommandCenterData(filters?: IAnalyticsFilterDTO): Promise<any>;
  getRootCauseAnalysis(filters?: IAnalyticsFilterDTO): Promise<any>;
  getExecutiveSummary(filters?: IAnalyticsFilterDTO): Promise<IExecutiveSummaryResponseDTO>;
  getProductionAnalytics(filters?: IAnalyticsFilterDTO): Promise<IProductionAnalyticsResponseDTO>;
  getApiIntelligence(filters?: IAnalyticsFilterDTO): Promise<IApiIntelligenceResponseDTO>;
  getSynchronizationAnalytics(filters?: IAnalyticsFilterDTO): Promise<ISynchronizationAnalyticsResponseDTO>;
  getFinishedGoodsAnalytics(filters?: IAnalyticsFilterDTO): Promise<IFinishedGoodsAnalyticsDTO>;
  getMasterDataAnalytics(filters?: IAnalyticsFilterDTO): Promise<IMasterDataAnalyticsDTO>;
  notifyLiveUpdate(topic: string, payload: unknown): void;
}

export class AnalyticsService implements IAnalyticsService {

  
  public async getRootCauseAnalysis(_filters?: IAnalyticsFilterDTO): Promise<any> {
    return this.repository.getRootCauseAnalysis(_filters);
  }

  public async getCommandCenterData(filters?: IAnalyticsFilterDTO): Promise<any> {
    const normalized = normalizeAnalyticsFilters(filters || {});
    return this.repository.getCommandCenterData(normalized);
  }

  public async getOrderTraceability(orderNumber: string): Promise<IOrderTraceabilityResponseDTO> {
    const startTime = Date.now();
    logger.info(`Fetching Order 360 Traceability for order: ${orderNumber}`);
    const data = await this.repository.getOrderTraceability(orderNumber);
    const durationMs = Date.now() - startTime;
    logger.info(`✅ AnalyticsService.getOrderTraceability completed in ${durationMs}ms`);
    return data;
  }

  private repository: IAnalyticsRepository;
  private cacheProvider: IRedisCacheService | null = null;
  private socketEmitter: ISocketAnalyticsEmitter | null = null;

  constructor(repository: IAnalyticsRepository = analyticsRepository) {
    this.repository = repository;
  }

  public setCacheProvider(cacheProvider: IRedisCacheService): void {
    this.cacheProvider = cacheProvider;
    logger.info('✅ Redis Cache Provider injected into AnalyticsService');
  }

  public setSocketEmitter(socketEmitter: ISocketAnalyticsEmitter): void {
    this.socketEmitter = socketEmitter;
    logger.info('✅ Socket.IO Telemetry Emitter injected into AnalyticsService');
  }

  public async getExecutiveSummary(filters?: IAnalyticsFilterDTO): Promise<IExecutiveSummaryResponseDTO> {
    const startTime = Date.now();
    const normalized = normalizeAnalyticsFilters(filters || {});
    const cacheKey = `analytics:executive:${JSON.stringify(normalized)}`;

    if (this.cacheProvider) {
      try {
        const cached = await this.cacheProvider.get<IExecutiveSummaryResponseDTO>(cacheKey);
        if (cached) {
          logger.info(`⚡ AnalyticsService.getExecutiveSummary served from Redis cache [${cacheKey}]`);
          return {
            ...cached,
            metadata: { ...cached.metadata, dataFreshness: 'CACHED' }
          };
        }
      } catch (cacheErr) {
        logger.warn(`⚠️ Redis cache lookup failed for key [${cacheKey}]: ${(cacheErr as Error).message}`);
      }
    }

    logger.info(`Fetching Executive Summary metrics from repository with filters: ${JSON.stringify(normalized)}`);
    const summary = await this.repository.getExecutiveSummary(normalized);

    if (this.cacheProvider) {
      try {
        await this.cacheProvider.set(cacheKey, summary, 60);
      } catch (cacheSetErr) {
        logger.warn(`⚠️ Redis cache set failed: ${(cacheSetErr as Error).message}`);
      }
    }

    const durationMs = Date.now() - startTime;
    logger.info(`✅ AnalyticsService.getExecutiveSummary completed in ${durationMs}ms`);
    return summary;
  }

  public async getProductionAnalytics(filters?: IAnalyticsFilterDTO): Promise<IProductionAnalyticsResponseDTO> {
    const startTime = Date.now();
    const normalized = normalizeAnalyticsFilters(filters || {});
    const cacheKey = `analytics:production:${JSON.stringify(normalized)}`;

    if (this.cacheProvider) {
      try {
        const cached = await this.cacheProvider.get<IProductionAnalyticsResponseDTO>(cacheKey);
        if (cached) {
          logger.info(`⚡ AnalyticsService.getProductionAnalytics served from Redis cache [${cacheKey}]`);
          return {
            ...cached,
            metadata: { ...cached.metadata, dataFreshness: 'CACHED' }
          };
        }
      } catch (cacheErr) {
        logger.warn(`⚠️ Redis cache lookup failed for key [${cacheKey}]: ${(cacheErr as Error).message}`);
      }
    }

    logger.info(`Fetching Production Analytics metrics from repository with filters: ${JSON.stringify(normalized)}`);
    const data = await this.repository.getProductionAnalytics(normalized);

    if (this.cacheProvider) {
      try {
        await this.cacheProvider.set(cacheKey, data, 60);
      } catch (cacheSetErr) {
        logger.warn(`⚠️ Redis cache set failed: ${(cacheSetErr as Error).message}`);
      }
    }

    const durationMs = Date.now() - startTime;
    logger.info(`✅ AnalyticsService.getProductionAnalytics completed in ${durationMs}ms`);
    return data;
  }

  public async getApiIntelligence(filters?: IAnalyticsFilterDTO): Promise<IApiIntelligenceResponseDTO> {
    const startTime = Date.now();
    const normalized = normalizeAnalyticsFilters(filters || {});
    const cacheKey = `analytics:api:${JSON.stringify(normalized)}`;

    if (this.cacheProvider) {
      try {
        const cached = await this.cacheProvider.get<IApiIntelligenceResponseDTO>(cacheKey);
        if (cached) {
          logger.info(`⚡ AnalyticsService.getApiIntelligence served from Redis cache [${cacheKey}]`);
          return {
            ...cached,
            metadata: { ...cached.metadata, dataFreshness: 'CACHED' }
          };
        }
      } catch (cacheErr) {
        logger.warn(`⚠️ Redis cache lookup failed for key [${cacheKey}]: ${(cacheErr as Error).message}`);
      }
    }

    logger.info(`Fetching API Intelligence metrics from repository with filters: ${JSON.stringify(normalized)}`);
    const data = await this.repository.getApiIntelligence(normalized);

    if (this.cacheProvider) {
      try {
        await this.cacheProvider.set(cacheKey, data, 60);
      } catch (cacheSetErr) {
        logger.warn(`⚠️ Redis cache set failed: ${(cacheSetErr as Error).message}`);
      }
    }

    const durationMs = Date.now() - startTime;
    logger.info(`✅ AnalyticsService.getApiIntelligence completed in ${durationMs}ms`);
    return data;
  }

  public async getSynchronizationAnalytics(filters?: IAnalyticsFilterDTO): Promise<ISynchronizationAnalyticsResponseDTO> {
    const startTime = Date.now();
    const normalized = normalizeAnalyticsFilters(filters || {});
    const cacheKey = `analytics:sync:${JSON.stringify(normalized)}`;

    if (this.cacheProvider) {
      try {
        const cached = await this.cacheProvider.get<ISynchronizationAnalyticsResponseDTO>(cacheKey);
        if (cached) {
          logger.info(`⚡ AnalyticsService.getSynchronizationAnalytics served from Redis cache [${cacheKey}]`);
          return {
            ...cached,
            metadata: { ...cached.metadata, dataFreshness: 'CACHED' }
          };
        }
      } catch (cacheErr) {
        logger.warn(`⚠️ Redis cache lookup failed for key [${cacheKey}]: ${(cacheErr as Error).message}`);
      }
    }

    logger.info(`Fetching Synchronization Analytics metrics from repository with filters: ${JSON.stringify(normalized)}`);
    const data = await this.repository.getSynchronizationAnalytics(normalized);

    if (this.cacheProvider) {
      try {
        await this.cacheProvider.set(cacheKey, data, 60);
      } catch (cacheSetErr) {
        logger.warn(`⚠️ Redis cache set failed: ${(cacheSetErr as Error).message}`);
      }
    }

    const durationMs = Date.now() - startTime;
    logger.info(`✅ AnalyticsService.getSynchronizationAnalytics completed in ${durationMs}ms`);
    return data;
  }

  public async getFinishedGoodsAnalytics(filters?: IAnalyticsFilterDTO): Promise<IFinishedGoodsAnalyticsDTO> {
    const normalized = normalizeAnalyticsFilters(filters || {});
    const cacheKey = `analytics:fg:${JSON.stringify(normalized)}`;
    if (this.cacheProvider) {
      const cached = await this.cacheProvider.get<IFinishedGoodsAnalyticsDTO>(cacheKey);
      if (cached) return cached;
    }

    const data = await this.repository.getFinishedGoodsAnalytics(normalized);

    if (this.cacheProvider) {
      await this.cacheProvider.set(cacheKey, data, 60);
    }

    return data;
  }

  public async getMasterDataAnalytics(filters?: IAnalyticsFilterDTO): Promise<IMasterDataAnalyticsDTO> {
    const normalized = normalizeAnalyticsFilters(filters || {});
    const cacheKey = `analytics:master:${JSON.stringify(normalized)}`;
    if (this.cacheProvider) {
      const cached = await this.cacheProvider.get<IMasterDataAnalyticsDTO>(cacheKey);
      if (cached) return cached;
    }

    const data = await this.repository.getMasterDataAnalytics(normalized);

    if (this.cacheProvider) {
      await this.cacheProvider.set(cacheKey, data, 120);
    }

    return data;
  }

  public notifyLiveUpdate(topic: string, payload: unknown): void {
    if (this.socketEmitter) {
      logger.info(`Emitting live analytics Socket.IO update on topic: ${topic}`);
      this.socketEmitter.emitEvent(topic, payload);
    }
  }
}

export const analyticsService = new AnalyticsService();
