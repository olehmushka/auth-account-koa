import { IAccessTokenData } from './types';

class TokenStorage {
  private token: string = null;
  private data: IAccessTokenData = null;
  private readonly tokenStorageKey = '@access_token';
  private readonly dataStorageKey = '@current_user';

  public constructor() {
    this.getToken();
  }

  public setFullTokenData(token: string, data: IAccessTokenData): void {
    this.setToken(token);
    this.setTokenData(data);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenStorageKey, token);
    this.token = token;
  }

  private setTokenData(data: IAccessTokenData): void {
    localStorage.setItem(this.dataStorageKey, JSON.stringify(data));
    this.data = data;
  }

  public getToken(): string | null {
    if (this.token) {
      return this.token;
    }

    const token = localStorage.getItem(this.tokenStorageKey);
    this.token = token;

    return token;
  }

  public getTokenData(): IAccessTokenData | null {
    if (this.data) {
      return this.data;
    }

    const data = JSON.parse(localStorage.getItem(this.dataStorageKey)) as IAccessTokenData;
    this.data = data;

    return data;
  }

  public getUserId(): string {
    const data = this.getTokenData();

    if (data) {
      return data.id;
    }

    return null;
  }

  public removeToken(): void {
    if (!this.token) return;

    localStorage.removeItem(this.tokenStorageKey);
    localStorage.removeItem(this.dataStorageKey);
    this.token = null;
    this.data = null;
  }
}

export default TokenStorage;
