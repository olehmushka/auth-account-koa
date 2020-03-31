import { Context, Next, Middleware } from 'koa';
import { StoreUserService } from './store.user.service';
import { AuthUserService } from '../auth.user.service';
import { BaseSessionToolkit } from '../../lib/baseServices';
import { getErrorResponse } from '../../lib/validation';
import { API as models } from '../../models/models';
import { status } from '../../utils';
import { AUTH_SERVICE_ID } from '../../config';

export const getSignUpHandler = (
  storeService: StoreUserService,
  authUserService: AuthUserService,
  sessionService: BaseSessionToolkit,
): Middleware => async (ctx: Context, next: Next): Promise<void> => {
  try {
    const user = ctx.request.body.data as models.SignUpUserData;
    const savedUser = await storeService.store(user);
    const authToken = await authUserService.createAuthToken(savedUser);

    const session = await sessionService.createSession(
      sessionService.composeKey({
        userId: savedUser.id,
        serviceId: AUTH_SERVICE_ID,
      }),
      authToken,
    );
    if (session instanceof Error) {
      throw session;
    }

    ctx.body = {
      data: {
        session,
        user: savedUser,
      },
    } as models.SignUpUserResponse;
    ctx.status = status.OK;
    await next();
  } catch (err) {
    ctx.body = getErrorResponse(err);
    ctx.status = status.INTERNAL_SERVER_ERROR;
  }
};
