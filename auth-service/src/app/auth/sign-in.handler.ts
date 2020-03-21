import { Context, Next, Middleware } from 'koa';
import { AuthUserService } from './auth.user.service';
import { getErrorResponse } from '../../lib/validation';
import { API as models } from '../../models/models';
import { status, _ } from '../../utils';
import { invalidUsernameErr, invalidPasswordErr } from './common';

export const getSignInHandler = (
  authService: AuthUserService,
): Middleware => async (ctx: Context, next: Next): Promise<void> => {
  try {
    const credentials = ctx.request.body as models.SignInUser;
    const user = await authService.authenticateUser(credentials);
    const authToken = await authService.createAuthToken(user);
    ctx.body = {
      data: {
        authToken,
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
