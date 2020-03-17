import { PgService } from '../../lib/pg';
import { API as models } from '../../models/models';
import { compareWithHash, sign } from '../../lib/crypto';
import { SessionService } from '../../lib/session';
import { _ } from '../../utils';
import { invalidPasswordErr, invalidUsernameErr } from './common';

interface TokenData {
  userId: string;
  role: string;
}

export class AuthUserService {
  private tableName = 'users';

  constructor(private db: PgService, private session: SessionService) {}

  public async authenticateUser({
    username,
    password,
  }: models.SignInUser): Promise<models.FullUser> {
    try {
      const users = await this.db.select(this.tableName, {
        where: { username },
      });
      if (users.length === 0) {
        throw new Error(invalidUsernameErr);
      }

      const isMatch = await compareWithHash(password, users[0].password);

      if (isMatch) {
        return users[0];
      }
      throw new Error(invalidPasswordErr);
    } catch (err) {
      return err.message ? Promise.reject(err.message) : Promise.reject(err);
    }
  }

  public async createAuthToken({
    id: userId,
    role,
  }: { id: string, role: string }): Promise<string> {
    const dataForToken: TokenData = { userId, role };
    try {
      const token = await sign(JSON.stringify(dataForToken));
      await this.session.createSession(userId, token);
      return token;
    } catch (err) {
      return err.message ? Promise.reject(err.message) : Promise.reject(err);
    }
  }
}

export const getAuthUserService = (db: PgService, session: SessionService) =>
  new AuthUserService(db, session);
