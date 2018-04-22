import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

export const ReviewListHeader = (props) => {
  return (
    <div>
      REVIEW LIST HEADER HERE
      <button onClick={() => {
        props.meteorCall('reviews.insert', (err, res) => {
          if (res) {

          }
        });
      }}>Create Review</button>
    </div>
  );
}

ReviewListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired
}

export default withTracker(() => {
  return {
    meteorCall: Meteor.call
  };
})(ReviewListHeader);