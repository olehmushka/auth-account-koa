import { Context, Next, Middleware } from 'koa';
import { PgService } from '../../lib/pg';
import { RedisService } from '../../lib/redis';
import { API as models } from '../../models/models';
import { status } from '../../utils';

export const getSignUpHandler = (dbClient: PgService, redisClient: RedisService): Middleware =>
  async (ctx: Context, next: Next) => {
    const data = ctx.request.body as models.SignUpUser;
    ctx.body = data;
    ctx.status = status.OK;
    await next();
  };
