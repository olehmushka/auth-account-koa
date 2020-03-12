import { PgService } from '../../lib/pg';
import { API as models } from '../../models/models';
import { converter, uuid } from '../../utils';

export class StoreUserService {
  private tableName = 'users';
  constructor(private db: PgService) {
  }

  public create(user: models.SignUpUser): Promise<any> {
    const usersToInsert = [
      converter.camelCasePropertiesToSnakeCase({ id: uuid.v4(), ...user }),
    ];

    return this.db.insert(this.tableName, usersToInsert);
  }
}

export const getStoreUserService = (db: PgService) =>
  new StoreUserService(db);
