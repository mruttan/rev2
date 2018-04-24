import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { history } from '../routes/AppRouter';

import { Reviews } from '../api/reviews';

export class ReviewEditor extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    if (this.props.review) {
      return (
        <div>
          <input placeholder="Your Title here"/>
          <input placeholder="Your Rating here"/>
          <textarea placeholder="Your Review here"></textarea>
        </div>
      );
    } else {
      return (
        <div>
          {this.props.selectedReviewId ? 'Review not found.' : 'Pick or create a review to start!'}
        </div>
      );
    }
  }
};


export default withTracker(() => {
  const selectedReviewId = Session.get('selectedReviewId');
  return {
    selectedReviewId,
    review: Reviews.findOne(selectedReviewId)
  }
})(ReviewEditor);