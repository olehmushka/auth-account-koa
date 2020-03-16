import { verify } from '../lib/crypto';
import { SessionService } from '../lib/session';
import { _ } from '../utils';

interface TokenData {
  userId: string;
  role: string;
}

export class AuthUserService {
  constructor(private session: SessionService) {}

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

export const getAuthUserService = (session: SessionService) =>
  new AuthUserService(session);
