/**
 * AddUserCoin.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from 'reactstrap';

import { globalvars } from '../globalvars';
import {
  backendUrl,
  userCoinsRoute,
  addUserCoinRoute,
  removeUserCoinRoute,
  viewEnum } from '../constants';


export class AddRemoveUserCoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: props.isLoggedIn,
      hasCoin: props.hasCoin,
      requestFinished: true,
    }; // end state

    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  } // end constructor


  componentWillMount() {
    this.resetRequestFlag();
  } // componentDidUpdate


  resetRequestFlag() {
    this.setState({
      requestFinished: false,
    }); // end setState()
  } // end resetRequestFlag()


  handleAddClick() {
    this.sendAddUserCoin();
    this.setState({
      isLoggedIn: true,
      hasCoin: true,
    }); // end setState()
  } // end handleAddClick()


  handleRemoveClick() {
    this.sendRemoveUserCoin();
    this.setState({
      isLoggedIn: true,
      hasCoin: false,
    }); // end setState()
  } // end handleRemoveClick()


  handleLoginClick() {
    this.props.changePageView(viewEnum.LOGINPAGE);
  } // end handleLoginClick()


  sendAddUserCoin() {
    // find the id value using the coin symbol
    const coinId = globalvars.coinList
      .find(coin => coin.symbol === this.props.coinSymbol).id;
    console.log(`AddRemoveUserCoin.sendAddUserCoin: coinSymbol: ${this.props.coinSymbol}`);
    console.log(`AddRemoveUserCoin.sendAddUserCoin: coinId: ${coinId}`);

    axios.get(backendUrl + addUserCoinRoute + coinId, { withCredentials: true })
      .then((response) => {
        console.log(`AddRemoveUserCoin.sendAddUserCoin: response: ${JSON.stringify(response)}`);
        // reload users coin list after adding coin
        return axios
          .get(backendUrl + userCoinsRoute, { withCredentials: true });
      })
      .then((response) => {
        globalvars.userCoinList = response.data;
        globalvars.userTimeStamp = new Date();
        // reset flag
        this.setState({
          requestFinished: false,
        }); // end setState()
      }) // end then()
      .catch((error) => {
        console.log(`AddRemoveUserCoin.sendAddUserCoin: error: ${JSON.stringify(error)}`);
      }); // end catch()
  } // end sendCoinId()


  sendRemoveUserCoin() {
    // find the id value using the coin symbol
    const coinId =
      globalvars.coinList
        .find(coin => coin.symbol === this.props.coinSymbol).id;

    axios.get(backendUrl + removeUserCoinRoute + coinId, { withCredentials: true })
      .then((response) => {
        console.log(`AddRemoveUserCoin.sendRemoveUserCoin: response: ${JSON.stringify(response)}`);
        return axios
          .get(backendUrl + userCoinsRoute, { withCredentials: true });
      }) // end then()
      .then((response) => {
        globalvars.userCoinList = response.data;
        globalvars.userTimeStamp = new Date();
        // reset flag
        this.setState({
          requestFinished: false,
        }); // end setState()
      }) // end then()
      .catch((error) => {
        console.log(JSON.stringify(error));
      }); // end catch()
  } // end sendCoinId()


  renderButton() {
    if (this.state.requestFinished) {
      return 'UPDATING LIST...';
    }

    if (this.state.isLoggedIn) {
      if (this.state.hasCoin) {
        return (
          <Button
            className="add-remove-coin-button"
            onClick={this.handleRemoveClick}
          >
            REMOVE FROM MY COINS
          </Button>
        ); // end return()
      } // end if

      return (
        <Button
          className="add-remove-coin-button"
          onClick={this.handleAddClick}
        >
          ADD TO MY COINS
        </Button>
      ); // end return()
    } // end if

    return (
      <Button
        className="add-remove-coin-button"
        onClick={this.handleLoginClick}
      >
        LOGIN TO ADD COINS
      </Button>
    ); // end return()
  } // end renderButton()


  render() {
    return (
      <div>
        {this.renderButton()}
      </div>
    ); // end return()
  } // end render()
} // end class AddUserCoin


AddRemoveUserCoin.propTypes = {
  coinSymbol: PropTypes.string.isRequired,
  changePageView: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  hasCoin: PropTypes.bool.isRequired,
}; // end propTypes


export default AddRemoveUserCoin;
