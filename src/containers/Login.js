import React from 'react';
import LoginButton from '../components/LoginButton';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'guest',
      password: 'blahblah',
      // userId: null,
    };
  }

  render() {
    return (
      <div>
        <LoginButton
          username={this.state.username}
          password={this.state.password}
        />
      </div>
    ); // end Login
  }
} // end class Login

export default Login;
