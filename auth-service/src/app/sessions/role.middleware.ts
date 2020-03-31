import { Context, Next, Middleware } from 'koa';
import { status } from '../../utils';
import { ROLE, ADMIN_ROLE_NAME, USER_ROLE_NAME } from '../common';
import * as common from './common';

export const getRoleMiddleware = (endpointName: Symbol): Middleware => async (
  ctx: Context,
  next: Next,
): Promise<void> => {
  let roles: ROLE[];
  switch (endpointName) {
    case common.DELETE_SESSION_ENDPOINT_NAME:
      roles = [ADMIN_ROLE_NAME, USER_ROLE_NAME];
      break;
    case common.GET_SESSION_ENDPOINT_NAME:
      roles = [ADMIN_ROLE_NAME, USER_ROLE_NAME];
      break;
    case common.POST_SESSION_ENDPOINT_NAME:
      roles = [ADMIN_ROLE_NAME, USER_ROLE_NAME];
      break;
    default:
      roles = [];
  }
  if (!roles.includes(ctx.state.role)) {
    ctx.throw(status.FORBIDDEN, {
      message: common.currUserHasNoPermissions,
      code: status.FORBIDDEN,
    });
  }
  await next();
};
