import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

export const ReviewListItem = (props) => {
  const className = props.review.selected ? 'item item--selected' : 'item';

  return (
    <div className={className} onClick={() => {
      props.Session.set('selectedReviewId', props.review._id);
    }}>
      <h5 className="item__title">{ props.review.title || 'Untitled review' }</h5>
      <p className="item__subtitle">{ moment(props.review.updatedAt).format('M/DD/YY') }</p>
      <p className="item__subtitle">{ props.review.writtenBy }</p>
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