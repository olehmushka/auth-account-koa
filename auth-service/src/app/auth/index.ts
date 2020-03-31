import Router from 'koa-router';
import { getSignUpHandler } from './sign-up.handler';
import { getSignInHandler } from './sign-in.handler';
import { BasePgService, BaseSessionToolkit } from '../../lib/baseServices';
import { getStoreUserService } from './store.user.service';
import { getAuthUserService } from '../auth.user.service';

const getAuthRouter = (
  dbClient: BasePgService,
  sessionService: BaseSessionToolkit,
): Router =>
  new Router()
    .post(
      '/sign-up',
      getSignUpHandler(
        getStoreUserService(dbClient),
        getAuthUserService(dbClient),
        sessionService,
      ),
    )
    .post(
      '/sign-in',
      getSignInHandler(getAuthUserService(dbClient), sessionService),
    );

export { getAuthRouter };
