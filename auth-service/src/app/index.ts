import Router from 'koa-router';
import { getAuthRouter } from './auth';
import { getUsersRouter } from './users';
import { getSessionsRouter } from './sessions';
import { getAuthUserMiddleware } from './auth.user.middleware';
import { getAuthUserService } from './auth.user.service';
import { getSessionService } from './session.service';
import { BasePgService } from '../lib/baseServices';
import { RedisService } from '../lib/redis';

const getApp = (dbClient: BasePgService, redisClient: RedisService) =>
  new Router()
    .use('/api/auth', getAuthRouter(dbClient, getSessionService(redisClient)).routes())
    .use(
      '/api/auth/users',
      getAuthUserMiddleware(getAuthUserService(), getSessionService(redisClient)),
      getUsersRouter(dbClient).routes(),
    )
    .use(
      '/api/auth/sessions',
      getAuthUserMiddleware(getAuthUserService(), getSessionService(redisClient)),
      getSessionsRouter(getSessionService(redisClient)).routes(),
    );

export { getApp };
