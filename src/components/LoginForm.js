import React from 'react';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
    };
  } // end constructor

  render() {
    return (
      <form>
        {this.state.username} {this.state.password}
      </form>
    );
  }
} // end class LoginField

export default LoginForm;
