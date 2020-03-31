export const PORT: number = process.env.AUTH_PORT
  ? Number(process.env.AUTH_PORT)
  : 0;
// DB config
export const DB_URL: string = process.env.DATABASE_URL || '';
export const MAX_NUMBER_OF_CLIENTS_IN_DB_POOL = 10;
export const IDLE_TIMEOUT_MILLIS_IN_DB = 30000;
// Redis config
export const REDIS_HOST: string = process.env.REDIS_HOST || '';
// Services IDs
export const AUTH_SERVICE_ID: string = process.env.AUTH_SERVICE_ID || '';
// Sessions config
export const AUTH_SESSION_LIFETIME: number  = process.env.AUTH_SESSION_LIFETIME
  ? Number(process.env.AUTH_SESSION_LIFETIME)
  : 0;

export const initConfigs = () => {
  if (PORT === 0) {
    throw new Error('PORT is not initialized');
  }

  if (DB_URL.length === 0) {
    throw new Error('DATABASE_URL is not initialized');
  }

  if (REDIS_HOST.length === 0) {
    throw new Error('REDIS_HOST is not initialized');
  }

  if (AUTH_SERVICE_ID.length === 0) {
    throw new Error('AUTH_SERVICE_ID is not initialized');
  }

  if (AUTH_SESSION_LIFETIME === 0) {
    throw new Error('AUTH_SESSION_LIFETIME is not initialized');
  }
};
