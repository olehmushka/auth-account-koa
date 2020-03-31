import { Context, Next, Middleware } from 'koa';
import { AuthUserService } from '../auth.user.service';
import { BaseSessionToolkit } from '../../lib/baseServices';
import { getErrorResponse } from '../../lib/validation';
import { API as models } from '../../models/models';
import { status, _ } from '../../utils';
import { invalidUsernameErr, invalidPasswordErr } from './common';
import { AUTH_SERVICE_ID } from '../../config';

export const getSignInHandler = (
  authUserService: AuthUserService,
  sessionService: BaseSessionToolkit,
): Middleware => async (ctx: Context, next: Next): Promise<void> => {
  try {
    const credentials = ctx.request.body.data as models.SignInUserData;
    const user = await authUserService.authenticateUser(credentials);
    const authToken = await authUserService.createAuthToken(user);

    const session = await sessionService.createSession(
      sessionService.composeKey({
        userId: user.id,
        serviceId: AUTH_SERVICE_ID,
      }),
      authToken,
    );
    if (session instanceof Error) {
      throw session;
    }

    ctx.body = {
      data: {
        session,
        user,
      },
    } as models.SignInUserResponse;
    ctx.status = status.OK;
    await next();
  } catch (err) {
    ctx.body = getErrorResponse(err);
    switch (true) {
      case [invalidUsernameErr, invalidPasswordErr].includes(err):
        ctx.status = status.FORBIDDEN;
        break;
      default:
        ctx.status = status.INTERNAL_SERVER_ERROR;
    }
  }
};
