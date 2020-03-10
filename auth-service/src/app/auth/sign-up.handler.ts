import { Context, Next, Middleware } from 'koa';
import { API as models } from '../../models/models';
import { status } from '../../utils';

export const getSignUpHandler = (): Middleware =>
  async (ctx: Context, next: Next) => {
    const data = ctx.request.body as models.SignUpUser;
    ctx.body = data;
    ctx.status = status.OK;
    await next();
  };
