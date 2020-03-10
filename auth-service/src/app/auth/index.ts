import Router from 'koa-router';
import { signUpHandler } from './sign-up.handler';

const authRouter = new Router();

authRouter.post('/sign-up', signUpHandler);

export { authRouter };
