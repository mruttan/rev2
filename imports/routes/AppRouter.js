import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Session } from 'meteor/session';

// both private/public route don't work because of withtracker, but
// the only purpose it served was for redirecting, I am dealing with
// redirecting in the components lifecycle methods directly.

// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';
import HomePage from '../ui/HomePage';
import Login from '../ui/Login';
import Signup from '../ui/Signup';
import NotFound from '../ui/NotFound';

export const history = createHistory();

const unauthenticatedPages = ['/login', '/signup'];
let isUnauthenticatedPage = false;

const ChangeTracker = withRouter(({ match, location, history }) => {
  const pathName = location.pathname;
  isUnauthenticatedPage = unauthenticatedPages.includes(pathName);

  return false;
});

export const onAuthChange = (isAuthenticated) => {
  console.log('isAuthenticated: ', isAuthenticated);
  console.log('pathname: ', history.location.pathname);
  if (isAuthenticated && isUnauthenticatedPage) {
    history.replace('/');
  }
}

//NotFound component does not work as intended, perhaps i need to route to something like
// /reviews? I don't really want to though...maybe it is a good idea

export const AppRouter = () => (
  <Router history={history}>
    <div>  
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/:id" component={HomePage} />
        <Route path="*" component={NotFound} />
      </Switch>
      <ChangeTracker />
    </div>
  </Router>
);