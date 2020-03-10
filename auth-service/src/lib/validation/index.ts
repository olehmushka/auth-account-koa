import { Context, Next, Middleware } from 'koa';
import { oas } from 'koa-oas3';
import compose from 'koa-compose';

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

export const validate = (openApiPath: string): Middleware =>
  compose([
    async(ctx: Context, next: Next): Promise<void> => {
      try {
        await next();
      } catch (err) {
        const { message, suggestions, code } = err as ValidationError;
        ctx.status = code;
        ctx.body = {
          message,
          errors: suggestions.map(({ error }: Suggestion) => error),
        };
      }
    },
    oas({
      file: openApiPath,
      endpoint: '/openapi.json',
      uiEndpoint: '/',
    }),
  ]);
