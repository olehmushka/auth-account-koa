import RestService from '../RestService';

export class UserService extends RestService<IUser> {
  protected anchor = '/users';
}

export default new UserService();
