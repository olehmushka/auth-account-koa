import { Context, Next, Middleware } from 'koa';
import { getErrorResponse } from '../../lib/validation';
import { API as models } from '../../models/models';
import { status } from '../../utils';
import { GetUserService } from './get.user.service';

export const getGetAllUsersHandler = (getUserService: GetUserService): Middleware =>
  async (ctx: Context, next: Next) => {
    try {
      const { limit, skip } = ctx.request.query;
      ctx.body = await getUserService.getSaveBalk(limit, skip) as models.SafeUser[];
      ctx.status = status.OK;
      await next();
    } catch (err) {
      ctx.body = getErrorResponse(err);
      ctx.status = status.INTERNAL_SERVER_ERROR;
    }
  };
