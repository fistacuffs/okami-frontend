/**
 * @file
 * Login.js
 * This is the login component of the application. It incorporates a form for
 * username and password information. A function is included that sends the
 * information to the backend for validation and if acceptible a one hour user
 * session begins with the backend server.
 *
 * @author Nicholas Weitzel
 * @since 1.0.0
 */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader } from 'reactstrap';

import { UserForm } from './UserForm';
import {
  backendUrl,
  loginRoute,
  userCoinsRoute,
  viewEnum } from '../constants';
import { globalvars } from '../globalvars';


export class Login extends React.Component {
  /**
   * @constructor
   * Login constructor
   * -iniitializes state properties for username, password, errorMessage,
   *  userCoinListLoaded flag and modal to falsey values
   * -binds methods changeUsername, changePassword, sendLogin and toggle to
   * 'this' component
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
      modal: false,
    }; // end state

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
    this.toggle = this.toggle.bind(this);
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
        errorMessage: 'empty field(s)',
        modal: true,
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
          // a server error occured with response;
          message += error.response.data.error;
        } else if (error.request) {
          message += 'A server error occured with no response. \n';
          message += `Request: ${error.request}. \n`;
        } else {
          message += 'An error occured generating the server request. \n';
          message += `Message: ${error.message}`;
        } // end if/else
        this.setState({
          errorMessage: message,
          modal: true,
        }); // end setState()
      }); // end catch()
  } // end handleClick()


  /**
   * toggle:
   * This method will toggle the modal between view and hidden.
   */
  toggle() {
    this.setState({
      modal: !this.state.modal,
    }); // end setState()
  } // end toggle


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
      <div className="login-container">
        <UserForm
          onUsernameChange={this.changeUsername}
          onPasswordChange={this.changePassword}
          onClick={this.sendLogin}
          onEnterPress={this.sendLogin}
        >
          LOGIN
        </UserForm>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>unsuccessful login...</ModalHeader>
          <ModalBody>
            {this.state.errorMessage}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>OK</Button>
          </ModalFooter>
        </Modal>
      </div>
    ); // end return()
  } // end render()
} // end class Login


/**
 * props:
 *
 * Required:
 * changePageView - function to change App state currentView
 */
Login.propTypes = {
  changePageView: PropTypes.func.isRequired,
}; // end propTypes


export default Login;
