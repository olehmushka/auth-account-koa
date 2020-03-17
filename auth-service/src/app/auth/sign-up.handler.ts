import { Context, Next, Middleware } from 'koa';
import { getErrorResponse } from '../../lib/validation';
import { StoreUserService } from './store.user.service';
import { AuthUserService } from './auth.user.service';
import { API as models } from '../../models/models';
import { status } from '../../utils';

export const getSignUpHandler = (
  storeService: StoreUserService,
  authService: AuthUserService,
): Middleware => async (ctx: Context, next: Next): Promise<void> => {
  try {
    const user = ctx.request.body as models.SignUpUser;
    const savedUser = await storeService.store(user);
    const authToken = await authService.createAuthToken(savedUser);
    ctx.body = {
      data: {
        authToken,
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
