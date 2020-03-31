import Router from 'koa-router';
import { getDeleteSessionHandler } from './delete-session';
import { getGetSessionHandler } from './get-session';
import { getPostSessionHandler } from './post-session';
import { AuthUserService } from '../auth.user.service';
import { getRoleMiddleware } from './role.middleware';
import { BaseSessionToolkit } from '../../lib/baseServices';
import * as common from './common';

const getSessionsRouter = (
  authUserService: AuthUserService,
  sessionService: BaseSessionToolkit,
): Router =>
  new Router()
    .delete(
      '/:sessionId',
      getRoleMiddleware(common.DELETE_SESSION_ENDPOINT_NAME),
      getDeleteSessionHandler(sessionService),
    )
    .get(
      '/:sessionId',
      getRoleMiddleware(common.GET_SESSION_ENDPOINT_NAME),
      getGetSessionHandler(sessionService),
    )
    .post(
      '/',
      getRoleMiddleware(common.POST_SESSION_ENDPOINT_NAME),
      getPostSessionHandler(authUserService, sessionService),
    );

export { getSessionsRouter };
