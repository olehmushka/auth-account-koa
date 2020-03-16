import { Context, Next, Middleware } from 'koa';
import { RedisService } from '../../lib/redis';
import { getErrorResponse } from '../../lib/validation';
import { StoreUserService } from './store.user.service';
import { API as models } from '../../models/models';
import { status } from '../../utils';

export const getSignUpHandler = (
  storeService: StoreUserService,
  redisClient: RedisService,
): Middleware => async (ctx: Context, next: Next): Promise<void> => {
  try {
    const user = ctx.request.body as models.SignUpUser;
    const savedUser = await storeService.create(user);
    ctx.body = { data: savedUser } as models.SignUpUserResponse;
    ctx.status = status.OK;
    await next();
  } catch (err) {
    ctx.body = getErrorResponse(err);
    ctx.status = status.INTERNAL_SERVER_ERROR;
  }
};
