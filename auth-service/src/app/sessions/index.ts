import Router from 'koa-router';
import { getDeleteSessionHandler } from './delete-session';
import { getGetSessionHandler } from './get-session';
import { getPostSessionHandler } from './post-session';

const getSessionsRouter = (): Router =>
  new Router()
    .delete('/:sessionId', getDeleteSessionHandler())
    .get('/:sessionId', getGetSessionHandler())
    .post('/', getPostSessionHandler());

export { getSessionsRouter };
