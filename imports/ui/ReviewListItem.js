import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

export const ReviewListItem = (props) => {
  return (
    <div onClick={() => {
      props.Session.set('selectedReviewId', props.review._id);
    }}>
      { props.review.title || 'Untitled review' }
      { moment(props.review.updatedAt).format('M/DD/YY') }
      { props.review.writtenBy }
      { props.review.selected ? ' - selected' : null }
    </div>
  );
};

ReviewListItem.propTypes = {
  review: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
}

export default withTracker(() => {
  return { Session };
})(ReviewListItem);