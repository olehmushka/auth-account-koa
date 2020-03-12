import Router from 'koa-router';
import { getGetAllUsersHandler } from './get-all';
import { PgService } from '../../lib/pg';
import { getGetUserService } from './get.user.service';

const getUsersRouter = (dbClient: PgService): Router =>
  new Router()
    .get('/', getGetAllUsersHandler(getGetUserService(dbClient)));

export {
  getUsersRouter,
};
