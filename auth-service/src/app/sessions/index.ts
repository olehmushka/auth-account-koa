import Router from 'koa-router';
import { getDeleteSessionHandler } from './delete-session';
import { getGetSessionHandler } from './get-session';
import { getPostSessionHandler } from './post-session';
import { BaseSessionToolkit } from '../../lib/baseServices';

const getSessionsRouter = (sessionService: BaseSessionToolkit): Router =>
  new Router()
    .delete('/:sessionId', getDeleteSessionHandler(sessionService))
    .get('/:sessionId', getGetSessionHandler(sessionService))
    .post('/', getPostSessionHandler(sessionService));

export { getSessionsRouter };
