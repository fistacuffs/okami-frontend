/**
 * Login.js
 *
 * This is the login component of the application. It incorporates a form form
 * username and password information. A function is included that sends the
 * information to the backend for validation and if acceptible a one hour user
 * session begins with the backend server.
 */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Col,
  Container,
  Row } from 'reactstrap';

import { UserForm } from './UserForm';
import {
  backendUrl,
  loginRoute,
  viewEnum } from '../constants';
import { globalvars } from '../globalvars';


export class Login extends React.Component {
  /**
   * formatMessage:
   * method to format error messages into JSX objects
   *
   * @param message: string containing error message
   */
  static formatMessage(message) {
    return (
      <Container>
        <Row>
          <Col>
            <h4>Unsuccessful Login: {message}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>Enter a new username and password to login.</h6>
          </Col>
        </Row>
      </Container>); // end return()
  } // end formatMessage


  /**
   * @constructor
   * Login constructor
   * -iniitializes state properties for username, password, and message
   * -binds methods changeUsername, changePassword, and sendLogin to 'this'
   *  component
   *
   * @param props: to pass any props to React components
   */
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
    }; // end state

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
  } // end constructor


  /**
   * changeUsername:
   * method changes the state property username of 'this' component
   *
   * @param newUsername: the new string value for username
   */
  changeUsername(newUsername) {
    this.setState({
      username: newUsername,
    }); // end setState()
  } // end changeUsername()


  /**
   * changePassword:
   * method changes the state property password of 'this' component
   *
   * @param newPassword: the new string value for password
   */
  changePassword(newPassword) {
    this.setState({
      password: newPassword,
    }); // end setState()
  } // end changePassword()


  /**
   * sendLogin:
   * method uses the state properties username and password to send a POST
   * request to the backend to attempt to get a userId and begin a user session
   * with the backend server. If successful, they will be routed to the landing
   * page. Otherwise an error message is displayed.
   */
  sendLogin() {
    // test for empty, null, or undefined fields
    if (!this.state.username || !this.state.password) {
      this.setState({
        message: Login.formatMessage('empty field(s)'),
      }); // end setState()
      return;
    } // end if

    // send request to backend with login information
    axios.post(backendUrl + loginRoute, {
      username: this.state.username,
      password: this.state.password,
    }, {
      withCredentials: true,
    }) // end post()
      .then((response) => {
        globalvars.userId = response.data.userId;
        globalvars.username = this.state.username;
        globalvars.userTimeStamp = new Date();

        // change view to landing page after successful login
        this.props.changePageView(viewEnum.LANDINGPAGE);
      }) // end then()
      .catch((error) => {
        this.setState({
          message: Login.formatMessage(error.response.data.error),
        }); // end setState()
      }); // end catch()
  } // end handleClick()


  /**
   * render:
   * Required method of React components to display components called when
   * component is constructed or state is changed.
   */
  render() {
    return (
      <div className={this.props.className}>
        <UserForm
          className="user-form"
          onUsernameChange={this.changeUsername}
          onPasswordChange={this.changePassword}
          onClick={this.sendLogin}
        >
          LOGIN
        </UserForm>
        {this.state.message}
      </div>
    ); // end return()
  } // end render()
} // end class Login


/**
 * props:
 *
 * Required:
 * className - string name used for css styling
 * changePageView - function to change App state currentView
 */
Login.propTypes = {
  className: PropTypes.string.isRequired,
  changePageView: PropTypes.func.isRequired,
}; // end propTypes


export default Login;
