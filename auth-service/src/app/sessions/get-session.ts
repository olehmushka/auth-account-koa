import { Context, Next, Middleware } from 'koa';
import { BaseSessionToolkit } from '../../lib/baseServices';
import { getErrorResponse } from '../../lib/validation';
import { API as models } from '../../models/models';
import { status } from '../../utils';
import { sessionWasNotFound } from '../common';

export const getGetSessionHandler = (
  sessionService: BaseSessionToolkit,
): Middleware => async (ctx: Context, next: Next) => {
  try {
    const result = (await sessionService.getSession(
      ctx.params.sessionId,
    )) as models.Session;
    if (result instanceof Error && result.message === sessionWasNotFound) {
      ctx.body = getErrorResponse(sessionWasNotFound);
      ctx.status = status.NOT_FOUND;
      return next();
    }
    if (result instanceof Error) {
      throw result;
    }

    ctx.body = { data: { session: result } } as models.GetSessionResponse;
    ctx.status = status.OK;
    await next();
  } catch (err) {
    ctx.body = getErrorResponse(err);
    ctx.status = status.INTERNAL_SERVER_ERROR;
  }
};
