import Router from 'koa-router';
import { getAuthRouter } from './auth';
import { getUsersRouter } from './users';
import { PgService } from '../lib/pg';
import { RedisService } from '../lib/redis';

const getApp = (dbClient: PgService, redisClient: RedisService) =>
  new Router()
    .use('/auth', getAuthRouter(dbClient, redisClient).routes())
    .use('/users', getUsersRouter(dbClient).routes());

export { getApp };
