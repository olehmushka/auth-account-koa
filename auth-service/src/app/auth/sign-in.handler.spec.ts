import { Context } from 'koa';
import { getSignInHandler } from './sign-in.handler';
import { getAuthUserService } from './auth.user.service';
import { MockPgService } from '../../lib/mocks/mock-pg';
import { MockSessionService } from '../../lib/mocks/mock-session';
import { hashString } from '../../lib/crypto';
import { status } from '../../utils';
import { invalidPasswordErr, invalidUsernameErr } from './common';

describe('app/auth/sign-in.handler', () => {
  const originalPassword = '';
  const user = { password: originalPassword };
  beforeAll(async () => {
    user.password = await hashString('');
  });

  const tests: {
    name: string;
    pgErrMsg?: string;
    pgData?: any[];
    sessionErrMsg?: string;
    expectedBody?: any;
    expectedStatusCode: number;
  }[] = [
    {
      name: 'Should catch db error',
      pgErrMsg: 'mockErr',
      expectedBody: {
        errors: [],
        message: 'mockErr',
      },
      expectedStatusCode: status.INTERNAL_SERVER_ERROR,
    },
    {
      name: 'Should catch invalidUsernameErr error',
      pgData: [],
      expectedBody: {
        errors: [],
        message: invalidUsernameErr,
      },
      expectedStatusCode: status.FORBIDDEN,
    },
    {
      name: 'Should catch invalidPasswordErr error',
      pgData: [{ password: 'dummyPass' }],
      expectedBody: {
        errors: [],
        message: invalidPasswordErr,
      },
      expectedStatusCode: status.FORBIDDEN,
    },
    {
      name: 'Should catch session error',
      pgData: [user],
      sessionErrMsg: 'mockErr',
      expectedBody: {
        errors: [],
        message: 'mockErr',
      },
      expectedStatusCode: status.INTERNAL_SERVER_ERROR,
    },
    {
      name: 'Should be OK',
      pgData: [user],
      expectedStatusCode: status.OK,
    },
  ];

  Promise.all(
    tests.map(async tt => {
      await it(tt.name, async () => {
        const pgErr = tt.pgErrMsg ? new Error(tt.pgErrMsg) : undefined;
        const sessionErr = tt.sessionErrMsg
          ? new Error(tt.sessionErrMsg)
          : undefined;
        const service = getAuthUserService(
          new MockPgService(pgErr, tt.pgData),
          new MockSessionService(sessionErr),
        );
        const handler = getSignInHandler(service);

        const ctx = {
          request: { body: { username: '', password: originalPassword } },
        } as Context;
        await handler(ctx, async () => {});
        if (tt.expectedBody) {
          expect(ctx.body).toMatchObject(tt.expectedBody);
        }
        expect(ctx.status).toBe(tt.expectedStatusCode);
      });
    }),
  );
});
