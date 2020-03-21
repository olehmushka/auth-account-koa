import { ReactNode } from 'react';
import { UserStore } from '../../stores';

export interface IAutoLoginProps {
  userStore?: UserStore;
  children: () => ReactNode;
}
