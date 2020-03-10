import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';

import { getApp } from './app/app';
import { validate } from './lib/validation';

const server = new koa();

server.use(bodyParser());
server.use(json());
server.use(logger());

server.use(validate(`${__dirname}/../k8s/openapi.yml`));

const app = getApp();
server.use(app.routes());
server.use(app.allowedMethods());

export { server };
