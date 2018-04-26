import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

export class ReviewListHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    Session.set('loggedIn', !!Meteor.userId())
  }
  componentDidUpdate() {
    Session.set('loggedIn', !!Meteor.userId());
  }
  handleOnClick() {
    this.props.meteorCall('reviews.insert', (err, res) => {
      if (res) {
        this.props.Session.set('selectedReviewId', res);
      }
    });
  } 
  render(props) {
    return (
      <div className="item-list__header">
        <button className="button" onClick={this.handleOnClick.bind(this)}>Create Review</button>
      </div>
    );

  }
}

ReviewListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
}

export default withTracker(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };
})(ReviewListHeader);