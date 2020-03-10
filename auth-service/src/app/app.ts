import Router from 'koa-router';
import { getAuthRouter } from './auth';

const getApp = () =>
  new Router()
    .use('/auth', getAuthRouter().routes());

export { getApp };
