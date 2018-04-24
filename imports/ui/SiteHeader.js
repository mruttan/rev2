import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

export class SiteHeader extends React.Component {
  constructor(props) {
    super(props);
  };
  handleLogout() {
    Accounts.logout();
    Session.set('loggedIn', false);
  }
  // can't figure out how to render based on log in status, at least session works correctly
  render(props) {
    return (
      <div>
        Site Header here
        <button onClick={this.handleLogout.bind(this)}>Logout</button>
      </div>
    )
  }
}

export default SiteHeader;


//lifecycle method "onLogout()"