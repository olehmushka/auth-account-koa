import { PgService } from '../../lib/pg';
import { API as models } from '../../models/models';

export class GetUserService {
  private tableName = 'users';
  constructor(private db: PgService) {
  }

  public getBatch(limit?: number, skip?: number): Promise<models.SafeUser[]> {
    return this.db.select(this.tableName, limit, skip);
  }
}

export const getGetUserService = (db: PgService) =>
  new GetUserService(db);
