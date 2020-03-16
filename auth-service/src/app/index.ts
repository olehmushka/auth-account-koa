import Router from 'koa-router';
import { getAuthRouter } from './auth';
import { getUsersRouter } from './users';
import { getAuthUserMiddleware } from './auth.user.middleware';
import { getAuthUserService } from './auth.user.service';
import { PgService } from '../lib/pg';
import { RedisService } from '../lib/redis';
import { getSessionService } from '../lib/session';

const getApp = (dbClient: PgService, redisClient: RedisService) =>
  new Router()
    .use('/auth', getAuthRouter(dbClient, redisClient).routes())
    .use(
      '/users',
      getAuthUserMiddleware(getAuthUserService(getSessionService(redisClient))),
      getUsersRouter(dbClient).routes(),
    );

export { getApp };
