import mssql from 'mssql/msnodesqlv8.js';
import { env } from '../config/env.config.js';
import { logger } from '../config/logger.config.js';
import { IDatabaseHealth } from '../interfaces/database.interface.js';

class ConnectionManager {
  private static instance: ConnectionManager;
  private pool: mssql.ConnectionPool | null = null;
  private connectionPromise: Promise<mssql.ConnectionPool> | null = null;

  private constructor() {}

  public static getInstance(): ConnectionManager {
    if (!ConnectionManager.instance) {
      ConnectionManager.instance = new ConnectionManager();
    }
    return ConnectionManager.instance;
  }

  /**
   * Builds the MSSQL configuration object targeting DHANUSIYASRI / MPAS_DB
   */
  private getMSSQLConfig(): mssql.config | { connectionString: string } {
    if (env.DB_USE_WINDOWS_AUTH) {
      const connectionString = `Driver={ODBC Driver 17 for SQL Server};Server=${env.DB_SERVER};Database=${env.DB_DATABASE};Trusted_Connection=yes;`;
      return {
        connectionString,
        parseJSON: true
      } as unknown as mssql.config;
    }

    return {
      user: env.DB_USER || '',
      password: env.DB_PASSWORD || '',
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
  }

  /**
   * Retrieves or initializes the single shared MSSQL Connection Pool
   */
  public async getPool(): Promise<mssql.ConnectionPool> {
    if (this.pool && this.pool.connected) {
      return this.pool;
    }

    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    const config = this.getMSSQLConfig();
    const authType = env.DB_USE_WINDOWS_AUTH ? 'Windows Authentication (ODBC Driver 17)' : 'SQL Authentication';
    logger.info(`Connecting to MSSQL Database -> Server: [${env.DB_SERVER}] Database: [${env.DB_DATABASE}] Auth: [${authType}]`);

    this.connectionPromise = new mssql.ConnectionPool(config as unknown as mssql.config)
      .connect()
      .then((pool) => {
        this.pool = pool;
        this.connectionPromise = null;
        logger.info(`✅ SQL Server connection pool connected successfully to ${env.DB_SERVER}/${env.DB_DATABASE}`);

        this.pool.on('error', (err: Error) => {
          logger.error(`⚠️ SQL Pool error: ${err.message}`, err);
          if (!this.pool?.connected) {
            this.pool = null;
          }
        });

        return pool;
      })
      .catch((err: Error) => {
        this.connectionPromise = null;
        this.pool = null;
        logger.error(`❌ Failed to connect to SQL Server [${env.DB_SERVER}]: ${err.message}`);
        throw err;
      });

    return this.connectionPromise;
  }

  /**
   * Verifies live database connectivity
   */
  public async checkHealth(): Promise<IDatabaseHealth> {
    const startTime = Date.now();
    try {
      const pool = await this.getPool();
      const result = await pool.request().query<{ healthPing: number }>('SELECT 1 AS healthPing');
      const responseTimeMs = Date.now() - startTime;

      const record = result.recordset[0];
      const isOk = record !== undefined && record.healthPing === 1;

      return {
        status: isOk ? 'connected' : 'disconnected',
        isConnected: isOk,
        server: env.DB_SERVER,
        database: env.DB_DATABASE,
        responseTimeMs,
        message: isOk ? 'Database is responsive' : 'Unexpected ping response'
      };
    } catch (error) {
      const err = error as Error;
      return {
        status: 'disconnected',
        isConnected: false,
        server: env.DB_SERVER,
        database: env.DB_DATABASE,
        responseTimeMs: Date.now() - startTime,
        message: err.message
      };
    }
  }

  /**
   * Graceful pool disconnection
   */
  public async closePool(): Promise<void> {
    if (this.pool) {
      try {
        logger.info('Closing SQL Server connection pool...');
        await this.pool.close();
        this.pool = null;
        logger.info('✅ SQL Server connection pool closed cleanly.');
      } catch (error) {
        const err = error as Error;
        logger.error(`❌ Error closing SQL Connection Pool: ${err.message}`);
      }
    }
  }
}

export const connectionManager = ConnectionManager.getInstance();
