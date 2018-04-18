import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { AppRouter, history } from '../imports/routes/AppRouter';

Meteor.startup(() => {
  ReactDOM.render(<AppRouter/>, document.getElementById('app'));
});