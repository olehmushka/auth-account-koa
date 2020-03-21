// / <reference types="react-scripts" />

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

interface IUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: IRole;
  password: string;
}

interface ISafeUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: IRole;
}

type IRole = 'ADMIN' | 'USER' | 'GUEST';
