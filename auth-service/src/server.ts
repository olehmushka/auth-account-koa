import koa, { Context } from 'koa';
import koaBodyparser from 'koa-bodyparser';
import koaJson from 'koa-json';
import koaLogger from 'koa-logger';
import * as koaOas3 from 'koa-oas3';
import compose from 'koa-compose';
import { app } from './app/app';

const server = new koa();

server.use(koaBodyparser());
server.use(koaJson());
server.use(koaLogger());

server.use(compose([
  async(ctx: Context, next: () => Promise<any>): Promise<void> => {
    try {
      await next();
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        message: 'Request validation failed',
        e: e,
        details: {
          where: e.where,
          name: e.key,
          message: e.message,
        },
      };
    }
  },
  koaOas3.oas({
    file: `${__dirname}/../k8s/openapi.yml`,
    endpoint: '/openapi.json',
    uiEndpoint: '/'
  }),
]))

server.use(app.routes());
server.use(app.allowedMethods());

export { server };
