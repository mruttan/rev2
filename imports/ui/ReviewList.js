import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Reviews } from '../api/reviews';
import ReviewListHeader from './ReviewListHeader';
import ReviewListItem from './ReviewListItem'
//import ReviewListEmptyItem from './ReviewListEmptyItem';

export const ReviewList = (props) => {
  return (
    <div>
      review list here
      <ReviewListHeader />
      { props.reviews.map((review) => {
        return <ReviewListItem key={review._id} review={review}/>
      })}
    </div>
  );
};

export default withTracker(() => {
  Meteor.subscribe('reviews');
  return { 
    reviews: Reviews.find({}, {
      sort: {
        updatedAt: -1
      }
    }).fetch().map((review) => {
      return {
        ...review
      };
    })
  };
})(ReviewList);