import Router from 'koa-router';
import { getGetAllUsersHandler } from './get-all';
import { getGetUserService } from './get.user.service';
import { PgService } from '../../lib/pg';

const getUsersRouter = (dbClient: PgService): Router =>
  new Router().get('/', getGetAllUsersHandler(getGetUserService(dbClient)));

export { getUsersRouter };
