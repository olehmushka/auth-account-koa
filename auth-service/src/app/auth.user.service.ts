import { API as models } from '../models/models';
import { compareWithHash, sign, verify } from '../lib/crypto';
import { BasePgService, BaseUser } from '../lib/baseServices';
import { _ } from '../utils';
import { invalidPasswordErr, invalidUsernameErr } from './auth/common';

interface TokenData {
  userId: string;
  role: string;
}

export class AuthUserService extends BaseUser {
  private tableName = 'users';

  constructor(private db: BasePgService) {
    super();
  }

  public async authenticateUser({
    username,
    password,
  }: models.SignInUserData): Promise<models.SafeUser> {
    try {
      const users = await this.db.select(this.tableName, {
        where: { username },
      });
      if (users.length === 0) {
        throw new Error(invalidUsernameErr);
      }

      const isMatch = await compareWithHash(password, users[0].password);

      if (isMatch) {
        return this.filterFullUser(users[0], ['password']);
      }
      throw new Error(invalidPasswordErr);
    } catch (err) {
      return err.message ? Promise.reject(err.message) : Promise.reject(err);
    }
  }

  public async createAuthToken({
    id: userId,
    role,
  }: {
    id: string;
    role: string;
  }): Promise<string> {
    const dataForToken: TokenData = { userId, role };
    try {
      const token = await sign(JSON.stringify(dataForToken));
      return token;
    } catch (err) {
      return err.message ? Promise.reject(err.message) : Promise.reject(err);
    }
  }

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

export const getAuthUserService = (db: BasePgService) =>
  new AuthUserService(db);
