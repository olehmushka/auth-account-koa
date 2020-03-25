export interface ISignInData {
  username: string;
  password: string;
}

export interface ILoginResponse {
  data: {
    session: ISession;
    user: ISafeUser;
  };
}
