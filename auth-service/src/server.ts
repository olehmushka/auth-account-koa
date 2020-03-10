import koa, { Context } from 'koa';
import bodyparser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';
import { oas } from 'koa-oas3';
import compose from 'koa-compose';
import { app } from './app/app';
import { status } from './utils';

const server = new koa();

server.use(bodyparser());
server.use(json());
server.use(logger());

server.use(compose([
  async(ctx: Context, next: () => Promise<any>): Promise<void> => {
    try {
      await next();
    } catch (err) {
      ctx.status = status.BAD_REQUEST;
      ctx.body = { messages: err.suggestions.map((suggestion: any) => suggestion.error) };
    }
  },
  oas({
    file: `${__dirname}/../k8s/openapi.yml`,
    endpoint: '/openapi.json',
    uiEndpoint: '/',
  }),
]));

server.use(app.routes());
server.use(app.allowedMethods());

export { server };
