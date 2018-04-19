import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} render={(props) => (
      isAuthenticated ? (
        <Redirect to="/" />
      ) : (
          <Component {...props} />
        )
    )} />
  );

// breaks when withTracker is used
export default withTracker(() => {
  isAuthenticated: !!Meteor.userId()
})(PublicRoute);