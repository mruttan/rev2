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
    this.state = {
      title: '',
      body: '',
      // having trouble declaring rating as a number, need to declare as a string.
      rating: 0
    };
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    this.props.call('reviews.update', this.props.review._id, { body });
  }
  handleRatingChange(e) {
    // maybe i can handle rating declaration here, using a regex to determine value is good,
    // and not update if it isn't.
    const rating = e.target.value;
    this.setState({ rating });
    this.props.call('reviews.update', this.props.review._id, { rating })
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    this.props.call('reviews.update', this.props.review._id, { title });
  }
  handleRemoval() {
    this.props.call('reviews.remove', this.props.review._id);
    this.props.history.replace('/');
    Session.set('selectedReviewId', '');
  }
  componentDidUpdate(prevProps, prevState) {
    const currentReviewId = this.props.review ? this.props.review._id : undefined;
    const prevReviewId = prevProps.review ? prevProps.review._id : undefined;

    if (currentReviewId && currentReviewId !== prevReviewId) {
      this.setState({
        title: this.props.review.title,
        rating: this.props.review.rating,
        body: this.props.review.body
      })
    }
  }
  render() {
    if (this.props.review) {
      return (
        <div className="editor">
          <input className="editor__title" value={this.state.title} placeholder="Your Title here" onChange={this.handleTitleChange.bind(this)}/>
          <input className="editor__rating" value={this.state.rating} placeholder="Your Rating here" onChange={this.handleRatingChange.bind(this)}/>
          <textarea className="editor__body" value={this.state.body} placeholder="Your Review here" onChange={this.handleBodyChange.bind(this)}></textarea>
          <div>
            <button className="button button--secondary" onClick={this.handleRemoval.bind(this)}>Delete Review</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="editor">
          <p className="editor__message">
            {this.props.selectedReviewId ? 'Review not found.' : 'Pick or create a review to start!'}
          </p>
        </div>
      );
    }
  }
};

ReviewEditor.propTypes = {
  review: PropTypes.object,
  selectedReviewId: PropTypes.string,
  call: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}


export default withTracker(() => {
  const selectedReviewId = Session.get('selectedReviewId');
  return {
    selectedReviewId,
    review: Reviews.findOne(selectedReviewId),
    call: Meteor.call,
    history
  }
})(ReviewEditor);