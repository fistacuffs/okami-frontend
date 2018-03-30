import React from 'react';
import axios from 'axios';

import { backendUrl, loginRoute, coinListRoute } from '../constants';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = { id: null };
    this.handleClick = this.handleClick.bind(this);
  } // end constructor

  handleClick() {
    let newId;

    axios.get(backendUrl + coinListRoute)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(`coin list response properties: ${Object.keys(response)}`);
        // eslint-disable-next-line no-console
        console.log(`coin list response.status: ${response.status}`);
        // eslint-disable-next-line no-console
        console.log(`coin list response.statusText: ${response.statusText}`);
        // eslint-disable-next-line no-console
        console.log(`coin list response.headers properties: ${Object.keys(response.headers)}`);
        // eslint-disable-next-line no-console
        console.log(`coin list response.headers.content-type: ${response.headers['content-type']}`);
        // eslint-disable-next-line no-console
        console.log(`coin list response.config properties: ${Object.keys(response.config)}`);
        // eslint-disable-next-line no-console
        console.log(`coin list response.request: ${response.request}`);
        // eslint-disable-next-line no-console
        console.log(`coin list response.data[0] properties: ${Object.keys(response.data[0])}`);
        // eslint-disable-next-line no-console
        console.log(`id: ${response.data[0].id} symbol: ${response.data[0].symbol}  name: ${response.data[0].name}`);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`coin list error: ${error.response}`);
      });

    /* fetch(backendUrl + loginRoute, {
      method: 'post',
      body: JSON.stringify({ username: 'guest', password: 'blahblah' }),
    })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(`fetch login response properties are: ${Object.keys(response)}`);

        newId = response;

        this.setState({
          id: newId,
        }); // end setState()

        if (this.state.id !== null) {
          // eslint-disable-next-line no-console
          console.log(`Got ID!!!!: ${this.state.id}`);
        } else {
          // eslint-disable-next-line no-console
          console.log('id still null');
        } // end if/else
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`fetch login error properties are: ${Object.keys(error)}`);
      }); // end fetch post() */

    axios.post(backendUrl + loginRoute, {
      username: 'guest',
      password: 'blahblah',
    })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(`login response is: ${response}`);
        // eslint-disable-next-line no-console
        console.log(`login response properties: ${Object.keys(response)}`);
        // eslint-disable-next-line no-console
        console.log(`login response data properties: ${Object.keys(response.data)}`);
        // eslint-disable-next-line no-console
        console.log(`login response headers properties: ${Object.keys(response.headers)}`);
        // eslint-disable-next-line no-console
        console.log(`login response config properties: ${Object.keys(response.config)}`);
        // eslint-disable-next-line no-console
        console.log(`login response request properties: ${Object.keys(response.request)}`);

        newId = response.data.userId;

        this.setState({
          id: newId,
        }); // end setState()

        if (this.state.id !== null) {
          // eslint-disable-next-line no-console
          console.log(`Got ID!!!!: ${this.state.id}`);
        } else {
          // eslint-disable-next-line no-console
          console.log('id still null');
        } // end if/else
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`login error is: ${error.response}`);
      }); // end axios.post()
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
