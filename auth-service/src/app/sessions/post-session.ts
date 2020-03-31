import { Context, Next, Middleware } from 'koa';
import { AuthUserService } from '../auth.user.service';
import { BaseSessionToolkit } from '../../lib/baseServices';
import { getErrorResponse } from '../../lib/validation';
import { API as models } from '../../models/models';
import { status } from '../../utils';

export const getPostSessionHandler = (
  authUserService: AuthUserService,
  sessionService: BaseSessionToolkit,
): Middleware => async (ctx: Context, next: Next) => {
  try {
    const { serviceId } = ctx.request.body.data as models.PostSessionData;

    const serviceToken = await authUserService.createAuthToken({
      id: ctx.state.useId,
      role: ctx.state.role,
    });
    const session = await sessionService.createSession(
      sessionService.composeKey({ serviceId, userId: ctx.state.userId }),
      serviceToken,
    );

    if (session instanceof Error) {
      throw session;
    }

    ctx.body = { data: { session } } as models.PostSessionResponse;
    ctx.status = status.OK;
    await next();
  } catch (err) {
    ctx.body = getErrorResponse(err);
    ctx.status = status.INTERNAL_SERVER_ERROR;
  }
};
