import { AuthService } from '../../services/api';
import { ISignInData } from '../../services/api/AuthService/types';
import MapStore from '../models/MapStore';

class UserStore extends MapStore<ISafeUser> {
  public async signIn(data: ISignInData) {
    const userData = await AuthService.signIn(data);

    this.setData(userData);

    return userData;
  }

  public signOut() {
    AuthService.signOut();
    this.removeData();
  }

  public async loadUser(): Promise<ISafeUser> {
    const user = await AuthService.fetchLoggedInUser();

    this.setData(user);

    return user;
  }

  private static instance: UserStore;

  public static getInstance(): UserStore {
    if (UserStore.instance) {
      return UserStore.instance;
    }

    const instance = new UserStore();
    UserStore.instance = instance;
    return instance;
  }
}

export default UserStore;
