export const PORT = 3000;

export const DB_URL: string = process.env.DATABASE_URL || '';
export const MAX_NUMBER_OF_CLIENTS_IN_DB_POOL = 10;
export const IDLE_TIMOUT_MILLIS_IN_DB = 30000;

export const REDIS_HOST: string = process.env.REDIS_HOST || '';

export const initConfigs = () => {
  if (!DB_URL) {
    throw new Error('DATABASE_URL is not initialized');
  }
  if (!REDIS_HOST) {
    throw new Error('DATABASE_URL is not initialized');
  }
};
