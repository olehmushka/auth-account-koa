import { RedisService } from '../redis';

export class SessionService {
  private readonly sessionPrefix = 'session:';

  constructor(private redisService: RedisService) {}

  public async createSession(userId: string, value: string): Promise<void> {
    this.redisService.setValue(`${this.sessionPrefix}${userId}`, value);
  }

  public async getSession(userId: string): Promise<any> {
    return this.redisService.getValue(`${this.sessionPrefix}${userId}`);
  }

  public async destroySession(userId: string): Promise<void> {
    this.redisService.delValue(`${this.sessionPrefix}${userId}`);
  }
}

export const getSessionService = (redisService: RedisService) =>
  new SessionService(redisService);