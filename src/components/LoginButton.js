/*
 * Filename: LoginButton.js
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

import './Components.css';

export class LoginButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  } // end constructor

  handleClick() {
    this.props.onClick();
  } // end handleClick()

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

LoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoginButton;
