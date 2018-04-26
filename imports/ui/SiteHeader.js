import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

export class SiteHeader extends React.Component {
  constructor(props) {
    super(props);

  };
  // can't figure out how to render based on log in status, at least session works correctly
  // update, this now works as intended! yay! i'm so smart
  render(props) {
    const navImageSrc = this.props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';

    if (Session.get('loggedIn') === true) {
      return (
        <div className="header">
          <div className="header__content">
            <img className="header__nav-toggle" src={navImageSrc} onClick={this.props.handleNavToggle}/>
            <h1 className="header__title">{this.props.title}</h1>
            <button className="button button--link-text" onClick={() => this.props.handleLogout()}>Logout</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="header">
          <div className="header__content">
            <h1 className="header__title">{this.props.title}</h1>
            <Link to="/login" className="button button--link">Login</Link>
            <Link to="/signup" className="button button--link">Signup</Link>
          </div>
        </div>
      );
    }
  }
}

SiteHeader.propTypes = {
  title: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool,
  handleLogout: PropTypes.func.isRequired,
  handleNavToggle: PropTypes.func.isRequired
}

export default withTracker(() => {
  const loggedIn = Session.get('loggedIn');
  return {
    loggedIn,
    handleLogout: () => {
      Accounts.logout(),
      Session.set('loggedIn', false)
    },
    handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen: Session.get('isNavOpen')
  };
})(SiteHeader);