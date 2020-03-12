import Router from 'koa-router';
import { getSignUpHandler } from './sign-up.handler';
import { PgService } from '../../lib/pg';
import { RedisService } from '../../lib/redis';
import { getStoreUserService } from './store.user.service';

const getAuthRouter = (dbClient: PgService, redisClient: RedisService): Router =>
  new Router()
    .post('/sign-up', getSignUpHandler(getStoreUserService(dbClient), redisClient));

export {
  getAuthRouter,
};
