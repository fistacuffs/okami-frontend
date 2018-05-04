/**
 * @file
 * Registration.js
 * This is the registration component of the application. It incorporates a form
 * for username and password information. A function is included that sends the
 * information to the backend for validation.
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
  registrationRoute,
  viewEnum } from '../constants';


export class Registration extends React.Component {
  /**
   * Registration constructor
   * -iniitializes state properties for username, password, errorMessage and
   *  modal to falsey values
   * -binds methods changeUsername, changePassword, sendRegistration and toggle
   *  to 'this' component
   *
   * @param props: to pass any props to React components
   */
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      modal: false,
    }; // end state

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.sendRegistration = this.sendRegistration.bind(this);
    this.toggle = this.toggle.bind(this);
  } // end constructor


  /**
   * changeUsername:
   * This method changes the state property username of this component.
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
   * This method changes the state property password of this component.
   *
   * @param newPassword: the new string value for password
   */
  changePassword(newPassword) {
    this.setState({
      password: newPassword,
    }); // end setState()
  } // end changePassword()


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
   * sendRegistration:
   * This method uses the state properties username and password to send a post
   * request to the backend to create login credentials. If successful, they
   * will be routed to the login page. Otherwise an error message is displayed.
   */
  sendRegistration() {
    // test for empty, null, or undefined fields
    if (!this.state.username || !this.state.password) {
      this.setState({
        errorMessage: 'empty field(s)',
        modal: true,
      }); // end setState
      return;
    } // end if

    // send request to backend with login information
    axios.post(backendUrl + registrationRoute, {
      username: this.state.username,
      password: this.state.password,
    }) // end post()
      .then((response) => {
        // test for successful response 'Created'
        if (response.statusText === 'Created') {
          this.props.changePageView(viewEnum.LOGINPAGE);
        // successful response could still result in unsuccessful registration
        } else {
          this.setState({
            errorMessage: response.statusText,
            modal: true,
          }); // end setState()
        } // end if/else
      }) // end then()
      .catch((error) => {
        let message = '';
        if (error.response) {
          // a server error occured with response:
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
  } // end sendRegistration()


  /**
   * render:
   * Required method of React components to display components called when
   * component is constructed or state is changed.
   */
  render() {
    return (
      <div className="registration-container">
        <UserForm
          onUsernameChange={this.changeUsername}
          onPasswordChange={this.changePassword}
          onClick={this.sendRegistration}
          onEnterPress={this.sendRegistration}
        >
          SIGN UP
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
    ); // end Login
  } // end render()
} // end class Login


/**
 * props:
 *
 * Required:
 * changePageView - function to change App state currentView
 */
Registration.propTypes = {
  changePageView: PropTypes.func.isRequired,
}; // end propTypes


export default Registration;
