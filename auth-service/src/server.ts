import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';

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

server.use(validate(`${__dirname}/../k8s/openapi.yml`));

const dbClient = getPgClient();
const redisClient = getRedisClient();
const app = getApp(dbClient, redisClient);
server.use(app.routes());
server.use(app.allowedMethods());

const closeConnections = () => {
  dbClient.closeConnection();
  redisClient.close();
};

export { server, closeConnections };
