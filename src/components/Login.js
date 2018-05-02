/**
 * Login.js
 *
 * This is the login component of the application. It incorporates a form for
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
  userCoinsRoute,
  viewEnum } from '../constants';
import { globalvars } from '../globalvars';


export class Login extends React.Component {
  /**
   * formatErrorMessage:
   * method to format error messages into JSX objects
   *
   * @param message: string containing error message
   */
  static formatErrorMessage(message) {
    return (
      <Container>
        <Row>
          <Col>
            <h4>Unsuccessful Login: {message}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>Enter username and password to login.</h6>
          </Col>
        </Row>
      </Container>); // end return()
  } // end formatErrorMessage


  /**
   * @constructor
   * Login constructor
   * -iniitializes state properties for username, password, errorMessage, and
   *  userCoinListLoaded flag to falsey values
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
      userCoinListLoaded: false,
      errorMessage: '',
    }; // end state

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
  } // end constructor


  /**
   * changeUsername:
   * This method changes the state property username of 'this' component.
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
   * This method changes the state property password of 'this' component.
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
   * This method uses the state properties username and password to send a post
   * request to the backend server to get a userId and begin a user session
   * with the backend server. If successful, they will be routed to the landing
   * page. Otherwise an error message is displayed.
   */
  sendLogin() {
    // test for empty, null, or undefined fields
    if (!this.state.username || !this.state.password) {
      this.setState({
        errorMessage: Login.formatErrorMessage('empty field(s)'),
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
        // save returned userId, username, and set timestamp
        globalvars.userId = response.data.userId;
        globalvars.username = this.state.username;
        globalvars.userTimeStamp = new Date();

        // load users coin list after successful login
        return axios
          .get(backendUrl + userCoinsRoute, { withCredentials: true });
      })
      .then((response) => {
        // save returned coin list and reset timestamp
        globalvars.userCoinList = response.data;
        globalvars.userTimeStamp = new Date();

        // set userCoinListLoaded flage to trigger rerender
        this.setState({
          userCoinListLoaded: true,
        }); // end setState

        // change view to landing page after successful login
        this.props.changePageView(viewEnum.LANDINGPAGE);
      }) // end then()
      .catch((error) => {
        let message = '';
        if (error.response) {
          message += 'A server error occured with response: \n';
          message += `Status: ${error.response.status}. \n`;
          message += `Message: ${error.response.data}. \n`;
          message += error.response.data.error;
        } else if (error.request) {
          message += 'A server error occured with no response. \n';
          message += `Request: ${error.request}. \n`;
        } else {
          message += 'An error occured generating the server request. \n';
          message += `Message: ${error.message}`;
        } // end if/else
        this.setState({
          errorMessage: Login
            .formatErrorMessage(`user currencies not loaded: ${message}`),
        }); // end setState()
      }); // end catch()
  } // end handleClick()


  /**
   * render:
   * Required method of React components to display components called when
   * component is constructed or state is changed.
   */
  render() {
    // message if user is logged in
    if (globalvars.isLoggedIn()) {
      return <h1>{`${globalvars.username} is logged in`}</h1>;
    } // end if

    // message if user coin list is loading
    if (globalvars.isLoggedIn() && !this.state.userCoinListLoaded) {
      return <h1>{`loading ${globalvars.username}'s currrencies...`}</h1>;
    } // end if

    return (
      <div className={this.props.className}>
        <UserForm
          className="user-form"
          onUsernameChange={this.changeUsername}
          onPasswordChange={this.changePassword}
          onClick={this.sendLogin}
          onEnterPress={this.sendLogin}
        >
          LOGIN
        </UserForm>
        {this.state.errorMessage}
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
