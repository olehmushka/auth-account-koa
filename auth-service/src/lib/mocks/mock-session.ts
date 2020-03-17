import { BaseSessionService } from '../baseServices';

export class MockSessionService extends BaseSessionService {
  constructor(public err?: Error, public data?: any) {
    super();
  }

  public async createSession(_userId: string, _value: string): Promise<void> {
    return this.err
      ? Promise.reject(this.err)
      : Promise.resolve(this.data);
  }

  public async getSession(_userId: string): Promise<any> {
    return this.err
      ? Promise.reject(this.err)
      : Promise.resolve(this.data);
  }

  public async destroySession(_userId: string): Promise<void> {
    return this.err
      ? Promise.reject(this.err)
      : Promise.resolve(this.data);
  }
}
