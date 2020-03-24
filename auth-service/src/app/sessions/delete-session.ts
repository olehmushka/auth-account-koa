import { Context, Next, Middleware } from 'koa';
import { getErrorResponse } from '../../lib/validation';
import { status } from '../../utils';

export const getDeleteSessionHandler = (): Middleware => async (ctx: Context, next: Next) => {
  try {
    const { sessionId } = ctx.params;

    // @todo add session deleting logic

    ctx.status = status.NO_CONTENT;
    await next();
  } catch (err) {
    ctx.body = getErrorResponse(err);
    ctx.status = status.INTERNAL_SERVER_ERROR;
  }
};
