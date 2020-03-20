import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';
import koaSwagger  from 'koa2-swagger-ui';
import * as yamljs from 'yamljs';

import { initConfigs } from './config';
import { getApp } from './app';
import { validate } from './lib/validation';
import { getPgClient } from './lib/pg';
import { getRedisClient } from './lib/redis';

const server = new koa();

initConfigs();

server.use(bodyParser());
server.use(json());
server.use(logger());

const swaggerPathname = `${__dirname}/../k8s/openapi.yml`;
server.use(validate(swaggerPathname));

const dbClient = getPgClient();
const redisClient = getRedisClient();
const app = getApp(dbClient, redisClient);
app.get('/api/auth/docs', koaSwagger({
  routePrefix: '/api/auth/docs',
  swaggerOptions: {
    spec: yamljs.load(swaggerPathname),
  },
}));
server.use(app.routes());
server.use(app.allowedMethods());

const closeConnections = () => {
  dbClient.closeConnection();
  redisClient.close();
};

export { server, closeConnections };
