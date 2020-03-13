import { Context, Next, Middleware } from 'koa';
import { oas } from 'koa-oas3';
import compose from 'koa-compose';
import { API } from '../../models/models';
import { _ } from '../../utils';

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

export const getErrorResponse = (err: { message: string } | string, messages?: string[]): API.Error => {
  const res = {
    message: _.get(err, 'message', err),
    errors: [],
  } as API.Error;

  if (messages) {
    res.errors = messages;
  }

  return res;
};

export const validate = (openApiPath: string): Middleware =>
  compose([
    async(ctx: Context, next: Next): Promise<void> => {
      try {
        await next();
      } catch (err) {
        const { suggestions, code } = err as ValidationError;
        ctx.status = code;
        ctx.body = getErrorResponse(err, suggestions.map(({ error }: Suggestion) => error));
      }
    },
    oas({
      file: openApiPath,
      endpoint: '/openapi.json',
      uiEndpoint: '/',
    }),
  ]);
