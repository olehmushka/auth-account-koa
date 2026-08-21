import { Context, Next, Middleware } from 'koa';
import { oas } from 'koa-oas3';
import compose from 'koa-compose';
import { API } from '../../models/models';
import { _, isErrorWithMessage } from '../../utils';

interface Suggestion {
  error: string;
}
interface ValidationError {
  message: string;
  expose: boolean;
  code: number;
  location: { in: string };
  suggestions: Suggestion[];
}

export const getErrorResponse = (
  err: unknown,
  messages?: string[],
): API.Error => {
  const res = {
    message: isErrorWithMessage(err) ? err.message : err,
    errors: [],
  } as API.Error;

  if (messages) {
    res.errors = messages;
  }

  return res;
};

export const validate = (openApiPath: string): Middleware =>
  // `koa-compose`, `koa-oas3` and `koa` each declare their own, slightly
  // incompatible generic flavors of `Middleware`/`Context`, so the composed
  // result can't be structurally proven to satisfy the plain `Middleware`
  // type here even though it is one at runtime. Asserting is safe: both
  // middlewares below only rely on the standard koa `Context`/`Next`.
  (compose([
    async (ctx: Context, next: Next): Promise<void> => {
      try {
        await next();
      } catch (err) {
        const { suggestions = [], code } = err as ValidationError;
        ctx.status = code;
        ctx.body = getErrorResponse(
          err,
          suggestions.map(({ error }: Suggestion) => error),
        );
      }
    },
    oas({
      file: openApiPath,
      endpoint: '/openapi.json',
      uiEndpoint: '/',
    }),
  ]) as unknown) as Middleware;
