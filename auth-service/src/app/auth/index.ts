import Router from 'koa-router';
import { getSignUpHandler } from './sign-up.handler';
import { PgService } from '../../lib/pg';
import { RedisService } from '../../lib/redis';

const getAuthRouter = (dbClient: PgService, redisClient: RedisService): Router =>
  new Router()
    .post('/sign-up', getSignUpHandler(dbClient, redisClient));

export {
  getAuthRouter,
};
