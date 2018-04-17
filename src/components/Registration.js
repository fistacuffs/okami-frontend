/**
 * Registration.js
 *
 * This is the parent component of the registration module.
 */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from 'reactstrap';

import { UserForm } from './UserForm';
import { backendUrl, registrationRoute } from '../constants';


export class Registration extends React.Component {
  /**
   * Registration constructor
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
    };

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.sendRegistration = this.sendRegistration.bind(this);
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
   * sendRegistration:
   * method uses the state properties username and password to send a POST
   * request to the backend to get a userId. Alerts user if username/password
   * combination is invalid or either field is empty (should implement with
   * something besides alerts())
   */
  sendRegistration() {
    if (!this.state.username || !this.state.password) {
      this.setState({
        message: 'Registration failed: Username or Password cannot be empty',
      });
      return;
    } // end if

    // send request to backend with login information
    axios.post(backendUrl + registrationRoute, {
      username: this.state.username,
      password: this.state.password,
    })
      .then((response) => {
        console.log(`reg response: ${response}`);
        this.setState({
          message: 'Registration complete!',
        }); // end setState()

        // this.props.changeViewToLandingPage();
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          message: `Registration failed: ${error.message}`,
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
          className="login-button"
          onClick={this.sendRegistration}
        >
          SIGN UP
        </Button>
        <h3>{this.state.message}</h3>
      </div>
    ); // end Login
  } // end render()
} // end class Login


/**
 * props:
 *
 * Required:
 * className - string name used for css styling
 */
Registration.propTypes = {
  className: PropTypes.string.isRequired,
  // changeViewToLandingPage: PropTypes.func.isRequired,
}; // end propTypes

export default Registration;
