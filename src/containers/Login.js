import React from 'react';
import axios from 'axios';

import { LoginButton } from '../components/LoginButton';
import { LoginForm } from '../components/LoginForm';
import { backendUrl, loginRoute } from '../constants';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      userId: null,
    };

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
  } // end constructor

  changeUsername(newUsername) {
    this.setState({
      username: newUsername,
    });
  } // end changeUsername()

  changePassword(newPassword) {
    this.setState({
      password: newPassword,
    });
  } // end changeLoginInfo()

  sendLogin() {
    let newId;

    if (!this.state.username || !this.state.password) {
      // eslint-disable-next-line no-console
      console.log(`!${this.state.username} is ${!this.state.username}`);
      // eslint-disable-next-line no-console
      console.log(`!${this.state.password} is ${!this.state.password}`);
      // eslint-disable-next-line no-alert
      alert('Username and password required for login');
      return;
    }

    // send request to backend with login information
    axios.post(backendUrl + loginRoute, {
      username: this.state.username,
      password: this.state.password,
    })
      .then((response) => {
        newId = response.data.userId;

        this.setState({
          userId: newId,
        }); // end setState()

        if (this.state.userId !== null) {
          // eslint-disable-next-line no-console
          console.log(`userId: ${this.state.userId}`);
        } else {
          // eslint-disable-next-line no-console
          console.log('userId is still null');
        } // end if/else
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`login error is: ${error.response}`);
      })
      .finally(() => {
        this.setState({
          // erase password from this component after login request
          password: null,
        });
      }); // end axios.post()
  } // end handleClick()

  render() {
    return (
      <div>
        <LoginForm
          onUsernameChange={this.changeUsername}
          onPasswordChange={this.changePassword}
        />
        <LoginButton onClick={this.sendLogin} />
      </div>
    ); // end Login
  } // end render()
} // end class Login

export default Login;
