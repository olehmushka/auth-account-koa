import { API as models } from '../../models/models';
import { hashString } from '../../lib/crypto';
import { BaseUser, BasePgService } from '../../lib/baseServices';
import { converter, uuid, _ } from '../../utils';

export class StoreUserService extends BaseUser {
  private tableName = 'users';

  constructor(private db: BasePgService) {
    super();
  }

  public async create(user: models.SignUpUser): Promise<models.SafeUser> {
    try {
      user.password = await hashString(user.password);
      const fullUser = { id: uuid.v4(), ...user };

      await this.db.insert(this.tableName, [
        converter.camelCasePropertiesToSnakeCase(fullUser),
      ]);

      return this.filterFullUser(fullUser, ['password']);
    } catch (err) {
      return err.message ? Promise.reject(err.message) : Promise.reject(err);
    }
  }
}

export const getStoreUserService = (db: BasePgService) => new StoreUserService(db);
