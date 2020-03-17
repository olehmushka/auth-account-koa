import Router from 'koa-router';
import { getGetAllUsersHandler } from './get-all';
import { getGetUserService } from './get.user.service';
import { BasePgService } from '../../lib/baseServices';

const getUsersRouter = (dbClient: BasePgService): Router =>
  new Router().get('/', getGetAllUsersHandler(getGetUserService(dbClient)));

export { getUsersRouter };
