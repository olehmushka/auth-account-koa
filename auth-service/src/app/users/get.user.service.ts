import { PgService } from '../../lib/pg';
import { BaseUser } from '../../lib/baseServices';
import { API as models } from '../../models/models';

export class GetUserService extends BaseUser {
  private tableName = 'users';
  constructor(private db: PgService) {
    super();
  }

  public getSaveBalk(limit?: number, skip?: number): Promise<models.SafeUser[]> {
    return this.db.select(this.tableName, { limit, skip })
      .then(users => users.map((user: models.FullUser) => this.filterFullUser(user, ['password'])));
  }
}

export const getGetUserService = (db: PgService) =>
  new GetUserService(db);
