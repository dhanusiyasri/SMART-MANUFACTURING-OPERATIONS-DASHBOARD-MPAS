import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const envSchema = z.object({
  PORT: z.string().transform((val) => parseInt(val, 10)).default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CORS_ORIGIN: z.string().default('*'),

  // MSSQL Configuration
  DB_USER: z.string().optional().default(''),
  DB_PASSWORD: z.string().optional().default(''),
  DB_SERVER: z.string().min(1, 'DB_SERVER is required'),
  DB_DATABASE: z.string().min(1, 'DB_DATABASE is required'),
  DB_PORT: z.string().transform((val) => parseInt(val, 10)).default('1433'),
  DB_ENCRYPT: z.string().transform((val) => val === 'true').default('false'),
  DB_TRUST_SERVER_CERTIFICATE: z.string().transform((val) => val === 'true').default('true'),
  DB_POOL_MAX: z.string().transform((val) => parseInt(val, 10)).default('20'),
  DB_POOL_MIN: z.string().transform((val) => parseInt(val, 10)).default('2'),
  DB_IDLE_TIMEOUT_MS: z.string().transform((val) => parseInt(val, 10)).default('30000'),
  DB_CONNECTION_TIMEOUT_MS: z.string().transform((val) => parseInt(val, 10)).default('15000'),

  // Logging & Real-time Settings
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'debug']).default('info'),
  SOCKET_PING_INTERVAL_MS: z.string().transform((val) => parseInt(val, 10)).default('25000'),
  SOCKET_PING_TIMEOUT_MS: z.string().transform((val) => parseInt(val, 10)).default('20000'),
  REALTIME_POLL_INTERVAL_MS: z.string().transform((val) => parseInt(val, 10)).default('5000')
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variable configuration:');
  console.error(JSON.stringify(_env.error.format(), null, 2));
  process.exit(1);
}

export const env = _env.data;
