import Router from 'koa-router';
import { authRouter } from './auth';

const app = new Router();

app.use('/auth', authRouter.routes());

export { app };
