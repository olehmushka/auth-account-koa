import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CustomSpinner from '../components/Loader/CustomSpinner';
import { Home, Login, Page404 } from '../pages';
import ProtectedRoute from './ProtectedRoute';

const RouteSchema = () => {
  return (
    <Router>
      <React.Suspense fallback={<CustomSpinner />}>
        <Switch>
          <ProtectedRoute privateRoute path="/home" component={Home} />
          <ProtectedRoute publicRoute exact path="/" component={Login} />

          <Route component={Page404} />
        </Switch>
      </React.Suspense>
    </Router>
  );
};
export default RouteSchema;
