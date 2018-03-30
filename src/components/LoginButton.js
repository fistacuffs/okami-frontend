/*
 * Filename: LoginButton.js
 *
 * React component that renders a button that will request a user ID from the
 * backend by sending a POST request with username and password.
 */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { backendUrl, loginRoute } from '../constants';
import './Components.css';

export default class LoginButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
    };
    this.handleClick = this.handleClick.bind(this);
  } // end constructor

  handleClick() {
    let newId;

    // send request to backend with login information
    axios.post(backendUrl + loginRoute, {
      username: this.props.username,
      password: this.props.password,
    })
      .then((response) => {
        newId = response.data.userId;

        this.setState({
          userId: newId,
        }); // end setState()

        if (this.state.id !== null) {
          // eslint-disable-next-line no-console
          console.log(`userId: ${this.state.userId}`);
        } else {
          // eslint-disable-next-line no-console
          console.log('userId is still null');
        } // end if/else
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`login error is: ${error.response}`);
      }); // end axios.post()
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
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
