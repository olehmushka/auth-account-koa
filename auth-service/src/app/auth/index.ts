import Router from 'koa-router';
import { getSignUpHandler } from './sign-up.handler';

const getAuthRouter = (): Router =>
  new Router()
    .post('/sign-up', getSignUpHandler());

export {
  getAuthRouter,
};
