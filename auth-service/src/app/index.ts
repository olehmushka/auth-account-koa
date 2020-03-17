import Router from 'koa-router';
import { getAuthRouter } from './auth';
import { getUsersRouter } from './users';
import { getAuthUserMiddleware } from './auth.user.middleware';
import { getAuthUserService } from './auth.user.service';
import { BasePgService } from '../lib/baseServices';
import { RedisService } from '../lib/redis';
import { getSessionService } from '../lib/session';

const getApp = (dbClient: BasePgService, redisClient: RedisService) =>
  new Router()
    .use('/auth', getAuthRouter(dbClient, redisClient).routes())
    .use(
      '/auth/users',
      getAuthUserMiddleware(getAuthUserService(getSessionService(redisClient))),
      getUsersRouter(dbClient).routes(),
    );

export { getApp };
