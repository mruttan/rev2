import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

export class SiteHeader extends React.Component {
  constructor(props) {
    super(props);
  };
  handleLogout() {
    Accounts.logout();
    Session.set('loggedIn', false);
  }
  // can't figure out how to render based on log in status, at least session works correctly
  // update, this now works as intended! yay! i'm so smart
  render(props) {
    if (Session.get('loggedIn') === true) {
      return (
        <div>
          Site Header here
          <button onClick={this.handleLogout.bind(this)}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          Site Header here
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      );
    }
  }
}

SiteHeader.propTypes = {
  loggedIn: PropTypes.bool
}

export default withTracker(() => {
  const loggedIn = Session.get('loggedIn');
  return {
    loggedIn
  };
})(SiteHeader);