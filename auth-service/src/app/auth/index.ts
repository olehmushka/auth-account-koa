import Router from 'koa-router';
import { getSignUpHandler } from './sign-up.handler';
import { getSignInHandler } from './sign-in.handler';
import { PgService } from '../../lib/pg';
import { RedisService } from '../../lib/redis';
import { getSessionService } from '../../lib/session';
import { getStoreUserService } from './store.user.service';
import { getAuthUserService } from './auth.user.service';

const getAuthRouter = (
  dbClient: PgService,
  redisClient: RedisService,
): Router =>
  new Router()
    .post(
      '/sign-up',
      getSignUpHandler(
        getStoreUserService(dbClient),
        getAuthUserService(dbClient, getSessionService(redisClient)),
      ),
    )
    .post(
      '/sign-in',
      getSignInHandler(
        getAuthUserService(dbClient, getSessionService(redisClient)),
      ),
    );

export { getAuthRouter };
