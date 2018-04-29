/**
 * Registration.js
 *
 * This is the parent component of the registration module.
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
  registrationRoute,
  viewEnum } from '../constants';


export class Registration extends React.Component {
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
            <h4>Unsuccessful Registration: {message}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>Enter a new username and password to register.</h6>
          </Col>
        </Row>
      </Container>); // end return()
  } // end formatMessage


  /**
   * Registration constructor
   * -iniitializes state properties for username, password, and message
   * -binds methods changeUsername, changePassword, and sendRegistration to
   * 'this' component
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
    this.sendRegistration = this.sendRegistration.bind(this);
  } // end constructor


  /**
   * changeUsername:
   * method changes the state property username of this component
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
   * method changes the state property password of this component
   *
   * @param newPassword: the new string value for password
   */
  changePassword(newPassword) {
    this.setState({
      password: newPassword,
    }); // end setState()
  } // end changePassword()


  /**
   * sendRegistration:
   * method uses the state properties username and password to send a POST
   * request to the backend to create login credentials. If successful, they
   * will be routed to the login page. Otherwise an error message is displayed.
   */
  sendRegistration() {
    // test for empty, null, or undefined fields
    if (!this.state.username || !this.state.password) {
      this.setState({
        message: Registration.formatMessage('empty field(s)'),
      }); // end setState
      return;
    } // end if

    // send request to backend with login information
    axios.post(backendUrl + registrationRoute, {
      username: this.state.username,
      password: this.state.password,
    }) // end post()
      .then((response) => {
        if (response.statusText === 'Created') {
          this.props.changePageView(viewEnum.LOGINPAGE);
        } else {
          this.setState({
            message: Registration.formatMessage(response.statusText),
          }); // end setState()
        } // end if/else
      }) // end then()
      .catch((error) => {
        this.setState({
          message: Registration.formatMessage(error.response.data.error),
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
      <div className={this.props.className}>
        <UserForm
          className="user-form"
          onUsernameChange={this.changeUsername}
          onPasswordChange={this.changePassword}
          onClick={this.sendRegistration}
        >
          SIGN UP
        </UserForm>
        {this.state.message}
      </div>
    ); // end Login
  } // end render()
} // end class Login


/**
 * props:
 *
 * Required:
 * className - string name used for css styling
 * changePageView - function to change App state currentView
 */
Registration.propTypes = {
  className: PropTypes.string.isRequired,
  changePageView: PropTypes.func.isRequired,
}; // end propTypes


export default Registration;
