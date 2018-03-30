import React from 'react';
import PropTypes from 'prop-types';

import './Components.css';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  } // end constructor

  handleUsernameChange(e) {
    this.props.onUsernameChange(e.target.value);
    // eslint-disable-next-line no-console
    console.log(`u: ${e.target.value}`);
  } // end handleUsernameChange()

  handlePasswordChange(e) {
    this.props.onPasswordChange(e.target.value);
    // eslint-disable-next-line no-console
    console.log(`pw: ${e.target.value}`);
  } // end handlePasswordChange()

  render() {
    return (
      <div className="login-form">
        <div>
          <span className="login-label">username</span>
          <input
            className="login-field"
            type="text"
            onChange={this.handleUsernameChange}
          />
        </div>
        <div>
          <span className="login-label">password</span>
          <input
            className="login-field"
            type="password"
            onChange={this.handlePasswordChange}
          />
        </div>
      </div>
    );
  } // end render()
} // end class LoginField

LoginForm.propTypes = {
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
};

export default LoginForm;
