import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Reviews } from '../api/reviews';
import ReviewListHeader from './ReviewListHeader';
import ReviewListItem from './ReviewListItem'
import ReviewListEmptyItem from './ReviewListEmptyItem';

export const ReviewList = (props) => {
  return (
    <div className="item-list">
      <ReviewListHeader />
      { props.reviews.length === 0 ? <ReviewListEmptyItem/> : undefined }
      { props.reviews.map((review) => {
        return <ReviewListItem key={review._id} review={review}/>
      })}
    </div>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.array.isRequired
};

export default withTracker(() => {
  const selectedReviewId = Session.get('selectedReviewId');

  Meteor.subscribe('reviews');
  return { 
    reviews: Reviews.find({}, {
      sort: {
        updatedAt: -1
      }
    }).fetch().map((review) => {
      return {
        ...review,
        selected: review._id === selectedReviewId
      };
    })
  };
})(ReviewList);