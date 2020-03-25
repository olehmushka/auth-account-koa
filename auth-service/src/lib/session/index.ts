import { RedisService } from '../redis';
import { BaseSessionToolkit } from '../baseServices';

export class SessionToolkit extends BaseSessionToolkit {
  constructor(protected redisService: RedisService) {
    super();
  }

  public async createSession(sessionId, value: string): Promise<any> {
    this.redisService.setValue(sessionId, value);
  }

  public async getSession(sessionId: string): Promise<any> {
    return this.redisService.getValue(sessionId);
  }

  public async destroySession(sessionId: string): Promise<any> {
    this.redisService.delValue(sessionId);
  }

  public composeKey(data: SessionData): string {
    return `${this.sessionPrefix}:${data.userId}:${data.serviceId}`;
  }

  public decomposeKey(id: string): SessionData {
    const [_prefix, userId, serviceId] = id.split(':');
    return {
      serviceId,
      userId,
    };
  }
}

export const getSessionToolkit = (redisService: RedisService) =>
  new SessionToolkit(redisService);
