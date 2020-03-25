import ApiService from '../ApiService';
import UserService from '../UserService';
import { ISignInData, ILoginResponse } from './types';

class AuthService extends ApiService {
  public async signIn(data: ISignInData): Promise<ISafeUser> {
    const response = await this.request<ILoginResponse>('auth-service', {
      url: '/sign-in',
      method: 'post',
      data,
    });

    const {
      session: { serviceToken },
      user,
    } = response.data.data;

    AuthService.tokenStorage.setFullTokenData(serviceToken, user);

    return this.fetchLoggedInUser();
  }

  public signOut() {
    AuthService.tokenStorage.removeToken();
  }

  public fetchLoggedInUser(): ISafeUser {
    const data = AuthService.tokenStorage.getTokenData();

    if (!data) {
      throw new Error('auth error');
    }

    return data;
  }
}

export default new AuthService();
