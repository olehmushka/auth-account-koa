import { Context, Next, Middleware } from 'koa';
import { AuthUserService } from './auth.user.service';
import { status, _ } from '../utils';

const BEARER_REGEX = /Bearer\s{1}/;

export const getAuthUserMiddleware = (authUserService: AuthUserService): Middleware =>
  async (ctx: Context, next: Next): Promise<void> => {
    try {
      const authorization = ctx.header.authorization;
      if (!BEARER_REGEX.test(authorization)) {
        throw new Error('Incorrect Bearer format');
      }

      const token = authorization.slice('Bearer '.length, authorization.length);
      await authUserService.verifyAuthToken(token);

      await next();
    } catch (err) {
      ctx.throw(status.UNAUTHORIZED, { message: _.get(err, 'message', err), code: status.UNAUTHORIZED });
    }
  };
