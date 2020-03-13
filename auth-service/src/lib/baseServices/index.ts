import { API as models } from '../../models/models';
import { _ } from '../../utils';

export abstract class BaseUser {
  protected filterFullUser(fullUser: models.FullUser, fieldsToOmit: string[]): models.SafeUser {
    return _.omit(fullUser, fieldsToOmit) as models.SafeUser;
  }
}
