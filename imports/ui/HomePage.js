import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withRouter } from 'react-router-dom';

import ReviewList from './ReviewList';
import ReviewEditor from './ReviewEditor';
import SiteHeader from './SiteHeader';

export class HomePage extends React.Component {
  constructor (props) {
    super(props);
  }

  render(props) {
    return (
      <div>
        home page
        <SiteHeader/>
        <div>
          review list will go here
          <ReviewList/>
        </div>
        <div>
          review editor will go here
          <ReviewEditor/>
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);