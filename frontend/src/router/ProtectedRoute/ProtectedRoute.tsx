import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { compose } from 'recompose';
import { IInputProps, IOutputProps } from './types';

const ProtectedRoute = ({
  userStore,
  publicRoute,
  privateRoute,
  ...props
}: IOutputProps) => {
  if (privateRoute && !userStore.isDataExist) {
    return <Redirect to="/" />;
  }

  if (publicRoute && userStore.isDataExist) {
    return <Redirect to="/home" />;
  }

  return <Route {...props} />;
};

export default compose<IOutputProps, IInputProps>(
  inject('userStore'),
  observer,
)(ProtectedRoute);
