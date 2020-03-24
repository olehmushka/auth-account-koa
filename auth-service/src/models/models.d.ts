/**
 * This file was auto-generated by swagger-to-ts.
 * Do not make direct changes to the file.
 */

export namespace API {
  export interface SignUpUserResponse {
    data: SignUpUserResponseData;
  }
  export interface SignUpUserResponseData {
    authToken: string;
    user: SafeUser;
  }
  export interface SignUpUser {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    username: string;
  }
  export interface SignInUserResponse {
    data: SignInUserResponseData;
  }
  export interface SignInUserResponseData {
    authToken: string;
    user: SafeUser;
  }
  export interface SignInUser {
    password: string;
    username: string;
  }
  export interface Session {
    expiryDate: number;
    id: string;
    serviceId: string;
    serviceToken: string;
    userId: string;
  }
  export interface SafeUser {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    role: string;
    username: string;
  }
  export interface PostSessionResponse {
    data: PostSessionResponseData;
  }
  export interface PostSessionResponseData {
    session: Session;
  }
  export interface PostSession {
    data: PostSessionData;
  }
  export interface PostSessionData {
    serviceId: string;
    userId: string;
  }
  export interface GetUsersResponse {
    data: GetUsersResponseData;
  }
  export interface GetUsersResponseData {
    users: SafeUser[];
  }
  export interface GetSessionResponse {
    data: GetSessionResponseData;
  }
  export interface GetSessionResponseData {
    session: Session;
  }
  export interface FullUser {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    password: string;
    role: string;
    username: string;
  }
  export interface Error {
    errors: string[];
    message: string;
  }
}
