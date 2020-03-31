import { Context, Next, Middleware } from 'koa';
import { AuthUserService } from './auth.user.service';
import { BaseSessionToolkit } from '../lib/baseServices';
import { status, _ } from '../utils';
import { sessionIsExpired } from './common';
import { AUTH_SERVICE_ID } from '../config';

const BEARER_REGEX = /Bearer\s{1}/;

export const getAuthUserMiddleware = (
  authUserService: AuthUserService,
  sessionService: BaseSessionToolkit,
): Middleware => async (ctx: Context, next: Next): Promise<void> => {
  try {
    const authorization = ctx.header.authorization;
    if (!BEARER_REGEX.test(authorization)) {
      throw new Error('Incorrect Bearer format');
    }

    const token = authorization.slice('Bearer '.length, authorization.length);
    const data = await authUserService.verifyAuthToken(token);
    ctx.state.userId = data.userId;
    ctx.state.role = data.role;
    const isSessionExpired = await sessionService.isExpired({
      userId: data.userId,
      serviceId: AUTH_SERVICE_ID,
    });
    if (isSessionExpired) {
      ctx.throw(status.extra.iis.LOGIN_TIME_OUT, {
        message: sessionIsExpired,
        code: status.extra.iis.LOGIN_TIME_OUT,
      });
    }

    await next();
  } catch (err) {
    ctx.throw(status.UNAUTHORIZED, {
      message: _.get(err, 'message', err),
      code: status.UNAUTHORIZED,
    });
  }
};
