import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { AppRouter, history, onAuthChange } from '../imports/routes/AppRouter';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Tracker.autorun(() => {
  const selectedReviewId = Session.get('selectedReviewId');
  Session.set('isNavOpen', false);

  if (selectedReviewId) {
    history.replace(`/${selectedReviewId}`);
  }
});

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');

  document.body.classList.toggle('is-nav-open', isNavOpen);
});


Meteor.startup(() => {
  Session.set('selectedReviewId', undefined);
  Session.set('loggedIn', undefined);
  ReactDOM.render(<AppRouter/>, document.getElementById('app'));
});