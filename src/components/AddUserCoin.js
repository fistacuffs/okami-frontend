/**
 * AddUserCoin.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from 'reactstrap';

import { globalvars } from '../globalvars';
import { backendUrl, addUserCoinRoute } from '../constants';


export class AddUserCoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coinAdded: false,
    }; // end state

    this.sendCoinId = this.sendCoinId.bind(this);
  } // end constructor


  sendCoinId() {
    const coinId =
      globalvars.coinList
        .find(coin => coin.symbol === this.props.coinSymbol).id;

    if (globalvars.userId !== null) {
      axios.get(`${backendUrl + addUserCoinRoute + coinId}`, { withCredentials: true })
        .then((response) => {
          console.log(`add coin response: ${Object.keys(response)}`);
        })
        .catch((error) => {
          console.log(`error.response.data.error: ${error.response.data.error}`);
          console.log(`error.response.status: ${error.response.status}`);
          console.log(`error.response.statusText: ${error.response.statusText}`);
        });
    } else {
      alert('Must log in to add coin');
    }// end if
  } // end sendCoinId()


  render() {
    let buttonText = '';
    if (this.state.coinAdded) {
      buttonText = 'COIN ADDED';
    } else {
      buttonText = 'ADD COIN';
    } // end if/else
    return <Button onClick={this.sendCoinId}>{buttonText}</Button>;
  } // end render()
} // end class AddUserCoin


AddUserCoin.propTypes = {
  coinSymbol: PropTypes.string.isRequired,
};


export default AddUserCoin;
