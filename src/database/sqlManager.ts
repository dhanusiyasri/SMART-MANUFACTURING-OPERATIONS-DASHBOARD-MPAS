import mssql from 'mssql/msnodesqlv8.js';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';

export interface DBHealthResult {
  isHealthy: boolean;
  message: string;
  responseTimeMs: number;
}

class SQLConnectionManager {
  private static instance: SQLConnectionManager;
  private pool: mssql.ConnectionPool | null = null;
  private connectingPromise: Promise<mssql.ConnectionPool> | null = null;

  private constructor() {}

  public static getInstance(): SQLConnectionManager {
    if (!SQLConnectionManager.instance) {
      SQLConnectionManager.instance = new SQLConnectionManager();
    }
    return SQLConnectionManager.instance;
  }

  /**
   * Initializes and retrieves the single shared MSSQL Connection Pool
   */
  public async getPool(): Promise<mssql.ConnectionPool> {
    if (this.pool && this.pool.connected) {
      return this.pool;
    }

    if (this.connectingPromise) {
      return this.connectingPromise;
    }

    const isWindowsAuth = process.env.DB_USE_WINDOWS_AUTH === 'true';
    logger.info(`Connecting to MSSQL Database Server [${env.DB_SERVER}:${env.DB_PORT}] Database [${env.DB_DATABASE}] Auth: [${isWindowsAuth ? 'Windows Auth' : 'SQL Auth'}]...`);

    const config: mssql.config | { connectionString: string } = isWindowsAuth
      ? ({ connectionString: `Driver={ODBC Driver 17 for SQL Server};Server=${env.DB_SERVER};Database=${env.DB_DATABASE};Trusted_Connection=yes;` } as unknown as mssql.config)
      : {
          user: env.DB_USER,
          password: env.DB_PASSWORD,
          server: env.DB_SERVER,
          database: env.DB_DATABASE,
          port: env.DB_PORT,
          options: {
            encrypt: env.DB_ENCRYPT,
            trustServerCertificate: env.DB_TRUST_SERVER_CERTIFICATE,
            enableArithAbort: true
          },
          pool: {
            max: env.DB_POOL_MAX,
            min: env.DB_POOL_MIN,
            idleTimeoutMillis: env.DB_IDLE_TIMEOUT_MS
          },
          connectionTimeout: env.DB_CONNECTION_TIMEOUT_MS,
          requestTimeout: 30000
        };

    this.connectingPromise = new mssql.ConnectionPool(config as unknown as mssql.config)
      .connect()
      .then((pool) => {
        this.pool = pool;
        this.connectingPromise = null;
        logger.info(`✅ MSSQL Connection Pool successfully initialized. Database [${env.DB_DATABASE}] on [${env.DB_SERVER}]`);

        this.pool.on('error', (err) => {
          logger.error('⚠️ Unexpected MSSQL Pool error:', err);
          if (!this.pool?.connected) {
            this.pool = null;
          }
        });

        return pool;
      })
      .catch((err) => {
        this.connectingPromise = null;
        this.pool = null;
        logger.error(`❌ Failed to connect to MSSQL Server: ${err.message}`, err);
        throw err;
      });

    return this.connectingPromise;
  }

  /**
   * Health check method executing a minimal ping query
   */
  public async checkHealth(): Promise<DBHealthResult> {
    const startTime = Date.now();
    try {
      const pool = await this.getPool();
      const result = await pool.request().query<{ health: number }>('SELECT 1 AS health');
      const responseTimeMs = Date.now() - startTime;

      if (result.recordset && result.recordset.length > 0 && result.recordset[0].health === 1) {
        return {
          isHealthy: true,
          message: 'SQL Server connection is active and responsive',
          responseTimeMs
        };
      }

      return {
        isHealthy: false,
        message: 'SQL Server responded with unexpected payload',
        responseTimeMs
      };
    } catch (error: any) {
      return {
        isHealthy: false,
        message: `Database health check failed: ${error.message || error}`,
        responseTimeMs: Date.now() - startTime
      };
    }
  }

  /**
   * Gracefully close the connection pool during application teardown
   */
  public async closePool(): Promise<void> {
    if (this.pool) {
      try {
        logger.info('Closing MSSQL Connection Pool...');
        await this.pool.close();
        this.pool = null;
        logger.info('✅ MSSQL Connection Pool closed successfully.');
      } catch (err: any) {
        logger.error(`❌ Error closing MSSQL Connection Pool: ${err.message}`);
      }
    }
  }
}

export const sqlManager = SQLConnectionManager.getInstance();
