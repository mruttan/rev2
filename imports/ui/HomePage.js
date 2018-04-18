import React from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class App extends React.Component{
  render() {
    return (
      <div>
        hello wurld
        <button onClick={() => Accounts.logout()}>Logout</button>
      </div>
    );
  }
}