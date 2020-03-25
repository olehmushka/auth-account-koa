import { Context, Next, Middleware } from 'koa';
import { BaseSessionToolkit } from '../../lib/baseServices';
import { getErrorResponse } from '../../lib/validation';
import { status } from '../../utils';

export const getDeleteSessionHandler = (sessionService: BaseSessionToolkit): Middleware => async (
  ctx: Context,
  next: Next,
) => {
  try {
    const result = await sessionService.destroySession(ctx.params.sessionId);
    if (result instanceof Error) {
      throw result;
    }
    ctx.status = status.NO_CONTENT;
    await next();
  } catch (err) {
    ctx.body = getErrorResponse(err);
    ctx.status = status.INTERNAL_SERVER_ERROR;
  }
};
