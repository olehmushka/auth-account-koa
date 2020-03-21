import React from 'react';
import { Provider } from 'mobx-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from '../router';
import { AutoLogin } from '../utils';
import { UserStore } from '../stores';
import * as serviceWorker from './serviceWorker';
import './declarations';
import '../styles/index.scss';

serviceWorker.register();

const userStore = UserStore.getInstance();

const AppContainer: React.FC = () => (
  <Provider
    userStore={userStore}
  >
    <>
      <AutoLogin>{() => <Router />}</AutoLogin>
      <ToastContainer />
    </>
  </Provider>
);

export default AppContainer;
