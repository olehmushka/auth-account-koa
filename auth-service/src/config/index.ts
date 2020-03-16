export const PORT = process.env.AUTH_PORT || undefined;

export const DB_URL: string = process.env.DATABASE_URL || '';
export const MAX_NUMBER_OF_CLIENTS_IN_DB_POOL = 10;
export const IDLE_TIMOUT_MILLIS_IN_DB = 30000;

export const REDIS_HOST: string = process.env.REDIS_HOST || '';

export const initConfigs = () => {
  if (PORT === undefined) {
    throw new Error('PORT is not initialized');
  }

  if (DB_URL.length === 0) {
    throw new Error('DATABASE_URL is not initialized');
  }

  if (REDIS_HOST.length === 0) {
    throw new Error('REDIS_HOST is not initialized');
  }
};
