import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Session } from 'meteor/session';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import HomePage from '../ui/HomePage';
import Login from '../ui/Login';

export const history = createHistory();

export const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" component={HomePage} exact={true} />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>
);