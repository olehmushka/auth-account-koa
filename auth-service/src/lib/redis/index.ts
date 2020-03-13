import * as redis from 'redis';
import { REDIS_HOST } from '../../config';

export const getRedisClient = () => new RedisService(redis.createClient(REDIS_HOST));

export class RedisService {
  private client: redis.RedisClient;

  constructor(client: redis.RedisClient) {
    this.client = client;
  }

  public close(): void {
    this.client.end(true);
  }

  public getValue(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err: Error | undefined | null, value: any): void => {
        if (err) {
          reject(err);
        }
        resolve(value);
      });
    });
  }

  public setValue(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, (err: Error | undefined | null): void => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  public delValue(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err: Error | undefined | null, value: any): void => {
        if (err) {
          reject(err);
        }
        resolve(value);
      });
    });
  }
}
