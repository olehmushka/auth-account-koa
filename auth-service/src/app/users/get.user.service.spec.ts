import { getGetUserService, GetUserService } from './get.user.service';
import { MockPgService } from '../../lib/mocks/mock-pg';

describe('app/users/get.user.service/getGetUserService', () => {
  it('Should create instance of AuthUserService class', () => {
    const service = getGetUserService(new MockPgService());
    expect(service).toBeInstanceOf(GetUserService);
  });
});

describe('app/users/get.user.service/GetUserService', () => {
  it('Should catch db error', async() => {
    const expectedErr = new Error('mockErr');
    getGetUserService(new MockPgService(expectedErr))
      .getSaveBalk()
      .catch(e => {
        expect(e).toEqual(expectedErr);
      });
  });
});
