import React, { FC, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import AppBreadcrumb from './components/AppBreadcrumb';
import { withFadingIn } from '../../components/FadeIn';
import CustomSpinner from '../../components/Loader/CustomSpinner';
import Page404 from '../Page404';
import Header from './components/Header';
import Footer from './Footer';
import routes from './routes';
import './style.scss';

const Home: FC<{}> = () => (
  <div className="app">
    <Header />
    <div className="app-body">
      <main className="main">
        <AppBreadcrumb className="breadcrumb-wrapper" />
        <Container fluid>
          <Suspense fallback={<CustomSpinner />}>
            <Switch>
              {routes.map(
                (route, index) =>
                  route.component && (
                    <Route
                      {...route}
                      component={withFadingIn(route.component)}
                      key={index} // eslint-disable-line react/no-array-index-key
                    />
                  )
              )}

              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Container>
      </main>
    </div>
    <Footer />
  </div>
);

export default Home;
