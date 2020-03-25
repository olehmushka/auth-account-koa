import { BaseSessionToolkit } from '../baseServices';

export class MockSessionService extends BaseSessionToolkit {
  constructor(public err?: Error, public data?: any) {
    super();
  }

  public async createSession(_id: string, _value: string): Promise<void> {
    return this.err ? Promise.reject(this.err) : Promise.resolve(this.data);
  }

  public async getSession(_id: string): Promise<any> {
    return this.err ? Promise.reject(this.err) : Promise.resolve(this.data);
  }

  public async destroySession(_id: string): Promise<void> {
    return this.err ? Promise.reject(this.err) : Promise.resolve(this.data);
  }
}
