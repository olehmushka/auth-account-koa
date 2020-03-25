import { Context, Next, Middleware } from 'koa';
import { BaseSessionToolkit } from '../../lib/baseServices';
import { getErrorResponse } from '../../lib/validation';
import { API as models } from '../../models/models';
import { status } from '../../utils';

export const getPostSessionHandler = (sessionService: BaseSessionToolkit): Middleware => async (
  ctx: Context,
  next: Next,
) => {
  try {
    const { serviceId, userId } = ctx.request.body
      .data as models.PostSessionData;

      // await sessionService.createSession();
      // createSession(data: SessionData | string, token: string)

    // @todo add session creation logic

    const session: models.Session = {
      serviceId,
      userId,
      expiryDate: Date.now(),
      id: '',
      serviceToken: '',
    };
    ctx.body = { data: { session } } as models.PostSessionResponse;
    ctx.status = status.OK;
    await next();
  } catch (err) {
    ctx.body = getErrorResponse(err);
    ctx.status = status.INTERNAL_SERVER_ERROR;
  }
};
