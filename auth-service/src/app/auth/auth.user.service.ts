import { API as models } from '../../models/models';
import { compareWithHash, sign } from '../../lib/crypto';
import {
  BasePgService,
  BaseSessionToolkit,
  BaseUser,
} from '../../lib/baseServices';
import { _ } from '../../utils';
import { invalidPasswordErr, invalidUsernameErr } from './common';
import { AUTH_SERVICE_ID } from '../../config';

interface TokenData {
  userId: string;
  role: string;
}

export class AuthUserService extends BaseUser {
  private tableName = 'users';

  constructor(private db: BasePgService, private session: BaseSessionToolkit) {
    super();
  }

  public async authenticateUser({
    username,
    password,
  }: models.SignInUser): Promise<models.SafeUser> {
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

  public async createSession(userId: string, token: string): Promise<models.Session> {
    try {
      const result = await this.session
        .createSession(this.session.composeKey({ userId, serviceId: AUTH_SERVICE_ID }), token);
      if (result instanceof Error) {
        return result.message ? Promise.reject(result.message) : Promise.reject(result);
      }
      return result;
    } catch (err) {
      return err.message ? Promise.reject(err.message) : Promise.reject(err);
    }
  }
}

export const getAuthUserService = (
  db: BasePgService,
  session: BaseSessionToolkit,
) => new AuthUserService(db, session);
