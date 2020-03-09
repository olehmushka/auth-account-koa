import Router from 'koa-router';
import * as models from '../models/models';

const app = new Router();

app.post('/auth/sign-up', async (ctx, next) => {
  const data = ctx.request.body as models.API.SignUpUser;
  ctx.body = data;
  await next();
});

export { app };
