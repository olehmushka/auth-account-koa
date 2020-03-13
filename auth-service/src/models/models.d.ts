/**
 * This file was auto-generated by swagger-to-ts.
 * Do not make direct changes to the file.
 */

export namespace API {
  export interface SignUpUser {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    username: string;
  }
  export interface SafeUser {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    role?: string;
    username: string;
  }
  export interface FullUser {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    password?: string;
    role: string;
    username: string;
  }
  export interface Error {
    errors: string[];
    message: string;
  }
}
