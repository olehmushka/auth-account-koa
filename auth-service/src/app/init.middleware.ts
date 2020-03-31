import { Context, Next, Middleware } from 'koa';

export const getInitMiddleware = (): Middleware => async (
  ctx: Context,
  next: Next,
): Promise<void> => {
  ctx.state = {};
  await next();
};
