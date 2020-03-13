import { RedisService } from '../redis';

export class SessionService {
  constructor(private redisService: RedisService) {}

  public getSession() {}

  public createSession() {}

  public destroySession() {}
}

export const getSessionService = (redisService: RedisService) =>
  new SessionService(redisService);
