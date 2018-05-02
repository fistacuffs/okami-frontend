/**
 * UserForm.js
 *
 * This component has input fields for a username and password with a button
 * below. The password field is hidden when input is typed.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Container,
  Row } from 'reactstrap';

import './Components.css';


export class UserForm extends React.Component {
  /**
   * @constructor
   * UserForm constructor
   * -binds methods handleUsernameChange, handlePasswordChange,
   *  handleButtonCLick and handleKeyPress to 'this' component
   *
   * @param props: to pass any props to React components
   */
  constructor(props) {
    super(props);

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  } // end constructor


  /**
   * handleUsernameChange:
   * This method calls the state-modifying method of the parent component when
   * an event is generated by the username input being changed.
   */
  handleUsernameChange(e) {
    this.props.onUsernameChange(e.target.value);
  } // end handleUsernameChange()


  /**
   * handlePasswordChange:
   * This method calls the state-modifying method of the parent component when
   * an event is generated by the password input being changed.
   */
  handlePasswordChange(e) {
    this.props.onPasswordChange(e.target.value);
  } // end handlePasswordChange()


  /**
   * handleButtonClick:
   * This method calls the function passed down from the parent component as a
   * prop when the button is clicked.
   */
  handleButtonClick() {
    this.props.onClick();
  } // end handleButtonClick()


  /**
   * handleKeyPress:
   * This method calls the state-modifying method of the parent component when
   * an event is generated by the enter key being pressed when the user is
   * typing in either text box.
   */
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onEnterPress();
    } // end if
  } // end handlePressEnter()


  /**
   * render:
   * Required method of React components to display components called when
   * component is constructed or state is changed.
   */
  render() {
    return (
      <Container className={this.props.className}>
        <Row>
          <span className="user-form-label">username</span>
          <input
            className="user-form-field"
            type="text"
            onChange={this.handleUsernameChange}
            onKeyPress={this.handleKeyPress}
          />
        </Row>
        <Row>
          <span className="user-form-label">password</span>
          <input
            className="user-form-field"
            type="password"
            onChange={this.handlePasswordChange}
            onKeyPress={this.handleKeyPress}
          />
        </Row>
        <Row>
          <Col>
            <Button
              className="user-form-button"
              onClick={this.handleButtonClick}
            >
              {this.props.children}
            </Button>
          </Col>
        </Row>
      </Container>
    ); // end return()
  } // end render()
} // end class UserForm


/**
 * defaultProps:
 * children - empty string
 */
UserForm.defaultProps = {
  children: '',
}; // end defaultProps


/**
 * props:
 * children - children of the button component in the form (usually string)
 *
 * Required:
 * className - string name used for css styling
 * onUsernameChange - username state modifying method of the parent component
 * onPasswordChange - password state modifying method of the parent component
 */
UserForm.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onEnterPress: PropTypes.func.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
}; // end propTypes


export default UserForm;
