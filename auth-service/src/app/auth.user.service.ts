import { verify } from '../lib/crypto';
import { _ } from '../utils';

export class AuthUserService {
  public async verifyAuthToken(authToken: string): Promise<TokenData> {
    try {
      const data = await verify(authToken);
      return _.isString(data)
        ? (JSON.parse(data) as TokenData)
        : (data as TokenData);
    } catch (err) {
      return err.message ? Promise.reject(err.message) : Promise.reject(err);
    }
  }
}

export const getAuthUserService = () =>
  new AuthUserService();
