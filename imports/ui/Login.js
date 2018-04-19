import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
  // this is where authentication is handled, history is part of props passed in
  // constructor method, lifecycle methods handle url changes through history.replace()
  constructor(props) {
    super(props);
    this.state= {
      error: ''
    };
  }
  componentWillMount() {
    if (Meteor.userId()) {
      this.props.history.replace('/');
    }
  }
  onSubmit(e) {
    e.preventDefault();
    // using bind.this allows you to use refs
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      if (err) {
        this.setState({ error: 'Unable to login. Check email and password.' });
      } else {
        this.setState({ error: '' });
      }
    });
  }
  

  render() {
    return (
      <div>
        <h1>Login</h1>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input type="password" ref="password" name="password" placeholder="Password" />
          <button>Login</button>
        </form>

        <Link to="/signup">Need an account?</Link>
        <Link to="/">Home</Link>
      </div>
    );
  }
}