import koa from 'koa';
import koaBodyparser from 'koa-bodyparser';
import koaJson from 'koa-json';
import koaLogger from 'koa-logger';
import * as koaOas3 from 'koa-oas3';
import { app } from './app/app';

const server = new koa();

server.use(koaBodyparser());
server.use(koaJson());
server.use(koaLogger());

server.use(koaOas3.oas({
  file: `${__dirname}/../k8s/openapi.yml`,
  endpoint: '/openapi.json',
  uiEndpoint: '/'
}))

server.use(app.routes());
server.use(app.allowedMethods());

export { server };
