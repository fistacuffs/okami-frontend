/*
 * Filename: LoginButton.js
 *
 * This is the button component of the login module. It handles the button clicks by
 * using a function prop passed down from the parent component.
 */
import React from 'react';
import PropTypes from 'prop-types';

import '../Components.css';

export class LoginButton extends React.Component {
  /**
   * LoginButton constructor
   * -binds method handleClick
   *
   * @param: to pass any props to React components
   */
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  } // end constructor


  /**
   * handleClick:
   * This method calls the button click handling method of the parent component when
   * a button click event is generated.
   */
  handleClick() {
    this.props.onClick();
  } // end handleClick()


  /**
   * render:
   * Required method of React components to create JFX element.
   */
  render() {
    return (
      <button
        className="login-button"
        onClick={this.handleClick}
      >
        LOGIN
      </button>
    );
  } // end render()
} // end class Login


/**
 * props:
 *
 * Required:
 * onClick - method of parent component to handle button clicks
 */
LoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoginButton;
