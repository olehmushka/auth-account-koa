export interface ISignInData {
  username: string;
  password: string;
}

export interface ILoginResponse {
  data: {
    authToken: string;
    user: ISafeUser;
  };
}
