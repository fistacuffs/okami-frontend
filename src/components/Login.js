/**
 * Login.js
 *
 * This is the parent component of the login module. It incorporates the login
 * button and login form and implements the logic for capturing the username
 * and password from the user and sending them to the backend in order to
 * request a user id.
 */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button } from './Button';
import { UserForm } from './UserForm';
import { backendUrl, loginRoute } from '../constants';
import { globalvars } from '../globalvars';


export class Login extends React.Component {
  /**
   * Login constructor
   * -iniitializes state properties for username, password, and userId
   * -binds methods changeUsername, changePassword, and sendLogin to this
   *  component
   *
   * @param: to pass any props to React components
   */
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
      userId: null,
    };

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
  } // end constructor


  /**
   * changeUsername:
   * method changes the state property username of this component
   *
   * @param: the new string value for username
   */
  changeUsername(newUsername) {
    this.setState({
      username: newUsername,
    });
  } // end changeUsername()


  /**
   * changePassword:
   * method changes the state property password of this component
   *
   * @param: the new string value for password
   */
  changePassword(newPassword) {
    this.setState({
      password: newPassword,
    });
  } // end changePassword()


  /**
   * sendLogin:
   * method uses the state properties username and password to send a POST
   * request to the backend to get a userId. Alerts user if username/password
   * combination is invalid or either field is empty (should implement with
   * something besides alerts())
   */
  sendLogin() {
    let newId;

    if (!this.state.username || !this.state.password) {
      /**
       * CHANGE ME TO SOMETHING BESIDES alert()
       */
      // eslint-disable-next-line no-alert
      this.setState({
        message: 'Login failed. Enter new username and password.',
      });
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
          message: 'Successful login.',
        }); // end setState()

        globalvars.userId = newId;
        globalvars.userTimeStamp = new Date();

        /* THIS SHOULD BE REMOVED FROM FINAL PRODUCT */
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
        console.log(error);
        this.setState({
          message: 'Login failed. Enter new username and password.',
        });
      })
      .finally(() => {
        this.setState({
          // erase password from this component after login request
          password: null,
        });
      }); // end axios.post()
  } // end handleClick()


  /**
   * render:
   * Required method of React components to create JFX element.
   */
  render() {
    return (
      <div className={this.props.className}>
        <UserForm
          className="user-form"
          onUsernameChange={this.changeUsername}
          onPasswordChange={this.changePassword}
        />
        <Button
          name="LOGIN"
          color="primary"
          className="login-button"
          onClick={this.sendLogin}
        />
        <h3>{this.state.message}</h3>
      </div>
    ); // end Login
  } // end render()
} // end class Login


Login.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Login;
