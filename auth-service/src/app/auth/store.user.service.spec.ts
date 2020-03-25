import { getStoreUserService, StoreUserService } from './store.user.service';
import { MockPgService } from '../../lib/mocks/mock-pg';

describe('app/auth/store.user.service/getStoreUserService', () => {
  it('Should create instance of AuthUserService class', () => {
    const service = getStoreUserService(new MockPgService());
    expect(service).toBeInstanceOf(StoreUserService);
  });
});

describe('app/auth/store.user.service/StoreUserService', () => {
  const emptyUser = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: '',
  };

  it('Should catch db error', async () => {
    const expectedErrMsg = 'mockErr';
    getStoreUserService(new MockPgService(new Error(expectedErrMsg)))
      .store(emptyUser)
      .catch(e => {
        expect(e).toEqual(expectedErrMsg);
      });
  });
});
