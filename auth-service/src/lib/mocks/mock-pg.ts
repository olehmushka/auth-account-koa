import { BasePgService, SelectOptions } from '../baseServices';

export class MockPgService extends BasePgService {
  constructor(public err?: Error, public data?: any) {
    super();
  }

  public insert(_tableName: string, _values: any[]): Promise<any> {
    return this.err ? Promise.reject(this.err) : Promise.resolve(this.data);
  }

  public select(_tableName: string, _options?: SelectOptions): Promise<any> {
    return this.err ? Promise.reject(this.err) : Promise.resolve(this.data);
  }

  public query(_queryText: string, _values?: any[]): Promise<any> {
    return this.err ? Promise.reject(this.err) : Promise.resolve(this.data);
  }

  public closeConnection(): Promise<void> {
    return this.err ? Promise.reject(this.err) : Promise.resolve(this.data);
  }
}
