import React from 'react';
import axios from 'axios';

const backendLoginUrl = 'https://mighty-fortress-28903.herokuapp.com/login';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = { id: null };
    this.handleClick = this.handleClick.bind(this);
  } // end constructor

  handleClick() {
    let newId;
    axios.post(backendLoginUrl, { username: 'guest', password: 'blahblah' })
      .then((response) => {
        newId = response;
      }); // end post()

    this.setState({
      id: newId,
    }); // end setState()

    if (this.state.id !== null) {
      console.log(this.state.id);
    } else {
      console.log('still null');
    } // end if/else
  } // end handleClick()

  render() {
    return (
      <button onClick={this.handleClick}>
        get id
      </button>
    );
  } // end render()
} // end class Login

export default Login;
