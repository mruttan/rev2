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
      <h5>{ props.review.title || 'Untitled review' }</h5>
      <p>{ moment(props.review.updatedAt).format('M/DD/YY') }</p>
      <p>{ props.review.writtenBy }</p>
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