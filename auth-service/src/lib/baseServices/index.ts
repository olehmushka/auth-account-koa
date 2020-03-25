import { API as models } from '../../models/models';
import { _ } from '../../utils';

export abstract class BaseUser {
  protected filterFullUser(
    fullUser: models.FullUser,
    fieldsToOmit: string[],
  ): models.SafeUser {
    return _.omit(fullUser, fieldsToOmit) as models.SafeUser;
  }
}

export interface SelectOptions {
  limit?: number;
  skip?: number;
  where?: object;
}

export abstract class BasePgService {
  protected client: any;

  public insert(_tableName: string, _values: any[]): Promise<any> {
    return new Promise(() => {});
  }

  public select(_tableName: string, _options?: SelectOptions): Promise<any> {
    return new Promise(() => {});
  }

  public query(_queryText: string, _values?: any[]): Promise<any> {
    return new Promise(() => {});
  }

  public closeConnection(): Promise<void> {
    return new Promise(() => {});
  }
}

export abstract class BaseSessionToolkit {
  protected readonly sessionPrefix = 'session';

  public async createSession(_id: string, _value: string): Promise<any> {
    return new Promise(() => {});
  }

  public async getSession(_id: string): Promise<any> {
    return new Promise(() => {});
  }

  public async destroySession(_id: string): Promise<any> {
    return new Promise(() => {});
  }

  public async isExpired(_data: SessionData | string): Promise<any> {
    return new Promise(() => {});
  }

  public composeKey(data: any): string {
    return '';
  }
}
