import { RouteProps } from 'react-router-dom';
import UserStore from '../../stores/UserStore';

export interface IInputProps extends RouteProps {
  publicRoute?: boolean;
  privateRoute?: boolean;
}

export interface IOutputProps extends IInputProps {
  userStore: UserStore;
}
