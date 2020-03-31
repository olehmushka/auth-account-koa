import { SessionToolkit } from '../lib/session';
import { RedisService } from '../lib/redis';
import { API as models } from '../models/models';
import { _ } from '../utils';
import { sessionWasNotFound } from './common';
import { AUTH_SERVICE_ID, AUTH_SESSION_LIFETIME } from '../config';

export class SessionService extends SessionToolkit {
  private readonly DEFAULT_SESSION_LIFETIME: number = 1800000; // 30 * 60000 => 30 minutes
  constructor(redisService: RedisService) {
    super(redisService);
  }

  public async createSession(
    data: SessionData | string,
    token: string,
  ): Promise<models.Session | Error> {
    try {
      const session: models.Session = {
        expiryDate: Date.now(),
        id: '',
        serviceId: '',
        serviceToken: token,
        userId: '',
      };
      if (typeof data === 'string') {
        const decomposedData = super.decomposeKey(data);
        session.expiryDate += this.getLifeTime(decomposedData.serviceId);
        session.id = data;
        session.serviceId = decomposedData.serviceId;
        session.userId = decomposedData.userId;
      } else {
        session.expiryDate += this.getLifeTime(data.serviceId);
        session.id = super.composeKey(data);
        (session.serviceId = data.serviceId), (session.userId = data.userId);
      }
      await super.createSession(session.id, JSON.stringify(session));
      return session;
    } catch ({ message }) {
      return new Error(message);
    }
  }

  public async getSession(
    data: SessionData | string,
  ): Promise<models.Session | Error> {
    try {
      const value =
        typeof data === 'string'
          ? await super.getSession(data)
          : await super.getSession(super.composeKey(data));
      const parsed = JSON.parse(value) as models.Session;
      if (_.isNull(parsed)) {
        return new Error(sessionWasNotFound);
      }
      if (parsed.expiryDate < Date.now()) {
        return new Error(`session in ${parsed.serviceId} was expired`);
      }
      return parsed;
    } catch ({ message }) {
      return new Error(message);
    }
  }

  public async destroySession(
    data: SessionData | string,
  ): Promise<void | Error> {
    try {
      typeof data === 'string'
        ? await super.destroySession(data)
        : await super.destroySession(super.composeKey(data));
    } catch ({ message }) {
      return new Error(message);
    }
  }

  public async isExpired(data: SessionData | string): Promise<boolean> {
    try {
      const value =
        typeof data === 'string'
          ? await super.getSession(data)
          : await super.getSession(super.composeKey(data));
      const parsed = JSON.parse(value) as models.Session;
      return parsed.expiryDate < Date.now();
    } catch {
      return true;
    }
  }

  private getLifeTime(serviceId: string): number {
    switch (serviceId) {
      case AUTH_SERVICE_ID:
        return AUTH_SESSION_LIFETIME;
      default:
        return this.DEFAULT_SESSION_LIFETIME;
    }
  }
}

export const getSessionService = (redisClient: RedisService) =>
  new SessionService(redisClient);
