import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withTracker } from 'meteor/react-meteor-data';

export const ReviewListItem = (props) => {
  return (
    <div>
      { props.review.title || 'Untitled review' }
      { moment(props.review.updatedAt).format('M/DD/YY') }
      { props.review.writtenBy }
    </div>
  );
};

export default withTracker(() => {
  return {

  };
})(ReviewListItem);