import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withRouter } from 'react-router-dom';

import ReviewList from './ReviewList';
import ReviewEditor from './ReviewEditor';

export class HomePage extends React.Component {
  constructor (props) {
    super(props);
  }

  render(props) {
    return (
      <div>
        hello wurld
        <button onClick={() => Accounts.logout()}>Logout</button>
        <div>
          review list will go here
          <ReviewList/>
        </div>
        <div>
          review editor will go here
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);