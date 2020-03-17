import { getAuthUserService, AuthUserService } from './auth.user.service';
import { MockPgService } from '../../lib/mocks/mock-pg';
import { MockSessionService } from '../../lib/mocks/mock-session';
import { invalidUsernameErr, invalidPasswordErr } from './common';
import { hashString } from '../../lib/crypto';

describe('app/auth/auth.user.service/getAuthUserService', () => {
  it('Should create instance of AuthUserService class', () => {
    const service = getAuthUserService(new MockPgService(), new MockSessionService());
    expect(service).toBeInstanceOf(AuthUserService);
  });
});

describe('app/auth/auth.user.service/AuthUserService/authenticateUser', () => {
  const originalPassword = '';
  const user = { password: originalPassword };
  beforeAll(async () => {
    user.password = await hashString(''); 
  });

  const tests: {
    name: string;
    pgErrMsg?: string;
    pgData?: any[];
    expectedErrMsg?: string;
    result?: any;
  }[]  = [
    {
      name: 'Should catch db error',
      pgErrMsg: 'mockErr',
      expectedErrMsg: 'mockErr',
    },
    {
      name: 'Should catch invalidUsernameErr error',
      pgData: [],
      expectedErrMsg: invalidUsernameErr,
    },
    {
      name: 'Should catch invalidPasswordErr error',
      pgData: [{ password: 'dummyPass' }],
      expectedErrMsg: invalidPasswordErr,
    },
    {
      name: 'Should be success',
      pgData: [user],
      result: user,
    },
  ];
  Promise.all(tests.map(async (tt) => {
    await it(tt.name, async() => {
      const expectedErr = tt.expectedErrMsg
        ? new Error(tt.expectedErrMsg)
        : undefined;
      const service = getAuthUserService(new MockPgService(expectedErr, tt.pgData), new MockSessionService());
      const credentials = { username: '', password: originalPassword };
      if (tt.expectedErrMsg) {
        await service.authenticateUser(credentials)
          .catch(e => {
            expect(e).toEqual(tt.expectedErrMsg);
          });
      } else {
        expect(await service.authenticateUser(credentials)).toMatchObject(tt.result);
      }
    });
  }));
});

describe('app/auth/auth.user.service/AuthUserService/createAuthToken', () => {
  it('Should catch session error', async () => {
    const expectedErrMsg = 'mockErr';
    getAuthUserService(new MockPgService(), new MockSessionService(new Error(expectedErrMsg)))
      .createAuthToken({ id: '', role: '' })
      .catch(e => {
        expect(e).toEqual(expectedErrMsg);
      });
  });
});
