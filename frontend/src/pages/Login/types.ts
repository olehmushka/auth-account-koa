import { RouteComponentProps } from 'react-router-dom';
import { UserStore } from '../../stores';

export interface ILoginProps extends RouteComponentProps {
  userStore: UserStore;
}
