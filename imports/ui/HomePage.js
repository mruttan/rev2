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
  componentWillMount() {
    Session.set('selectedReviewId', this.props.match.params.id);
  }

  render(props) {
    return (
      <div>
        <SiteHeader title="Rev2"/>
        <div className="page-content">
          <div className="page-content__sidebar">
            <ReviewList/>
          </div>
          <div className="page-content__main">
            <ReviewEditor/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);