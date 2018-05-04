/**
 * @file
 * AddRemoveUserCoin.js
 * This component handles adding and removing coins to the backend server
 * database. It includes a button that changes depending on whether there is
 * a user logged in and if there is, whether the coin is in their list. The
 * users timestamp to track their session time is updated with each request made
 * to the backend server.
 *
 * @author Nicholas Weitzel
 * @since 1.0.0
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
  /**
   * @constructor
   * AddRemoveUserCoin constructor
   * -iniitializes state properties for isLoggedIn, hasCoin, requestFinished,
   *  and error message.
   * -binds methods handleAddClick, handleRemoveClick, and handleLoginClick to
   *  'this' component
   *
   * @param props: to pass any props to React components
   */
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: props.isLoggedIn,
      hasCoin: props.hasCoin,
      requestFinished: false,
      errorMessage: '',
    }; // end state

    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  } // end constructor


  /**
   * handleAddClick:
   * This method handles the action of clicking the button to add to the user
   * coin list. It updates the necessary state properties to render a new
   * button if necessary.
   */
  handleAddClick() {
    this.sendAddUserCoin();
    this.setState({
      isLoggedIn: true,
      hasCoin: true,
    }); // end setState()
  } // end handleAddClick()


  /**
   * handleRemoveClick:
   * This method handles the action of clicking the button to remove from the
   * user coin list. It updates the necessary state properties to render a new
   * button if necessary.
   */
  handleRemoveClick() {
    this.sendRemoveUserCoin();
    this.setState({
      isLoggedIn: true,
      hasCoin: false,
    }); // end setState()
  } // end handleRemoveClick()


  /**
   * handleLoginClick:
   * This method handles the action of clicking the button to render the login
   * page view to allow the user to login.
   */
  handleLoginClick() {
    this.props.changePageView(viewEnum.LOGINPAGE);
  } // end handleLoginClick()


  /**
   * sendAddUserCoin:
   * This method sends the request to add the coin to the backend server and
   * handles any errors stemming from the request.
   */
  sendAddUserCoin() {
    // find the id value using the coin symbol
    const coinId = globalvars.coinList
      .find(coin => coin.symbol === this.props.coinSymbol).id;

    axios.get(backendUrl + addUserCoinRoute + coinId, { withCredentials: true })
      .then((response) => {
        if (!response) {
          throw new Error('No response from the server request.');
        } // end if
        // reload users coin list after adding coin
        return axios.get(backendUrl + userCoinsRoute, { withCredentials: true });
      })
      .then((response) => {
        // update user coinList and user server request timestamp
        globalvars.userCoinList = response.data;
        globalvars.userTimeStamp = new Date();
        // reset flag
        this.setState({
          requestFinished: false,
        }); // end setState()
      }) // end then()
      .catch((error) => {
        let message = '';
        if (error.response) {
          message += 'A server error occured with response: \n';
          message += `Status: ${error.response.status}. \n`;
          message += `Message: ${error.response.data}. \n`;
          message += error.response.data.error;
        } else if (error.request) {
          message += 'A server error occured with no response. \n';
          message += `Request: ${error.request}. \n`;
        } else {
          message += 'An error occured generating the server request. \n';
          message += `Message: ${error.message}`;
        } // end if/else
        this.setState({
          errorMessage: message,
        }); // end setState()
      }); // end catch()
  } // end sendCoinId()


  /**
   * sendRemoveUserCoin:
   * This method sends the request to remove the coin from the backend server
   * and handles any errors stemming from the request.
   */
  sendRemoveUserCoin() {
    // find the id value using the coin symbol
    const coinId =
      globalvars.coinList
        .find(coin => coin.symbol === this.props.coinSymbol).id;

    axios.get(backendUrl + removeUserCoinRoute + coinId, { withCredentials: true })
      .then((response) => {
        if (!response) {
          throw new Error();
        } // end if
        // reload users coin list after adding coin
        return axios
          .get(backendUrl + userCoinsRoute, { withCredentials: true });
      }) // end then()
      .then((response) => {
        // update user coinList and user server request timestamp
        globalvars.userCoinList = response.data;
        globalvars.userTimeStamp = new Date();
        // reset flag
        this.setState({
          requestFinished: false,
        }); // end setState()
      }) // end then()
      .catch((error) => {
        let message = '';
        if (error.response) {
          message += 'A server error occured with response: \n';
          message += `Status: ${error.response.status}. \n`;
          message += `Message: ${error.response.data}. \n`;
          message += error.response.data.error;
        } else if (error.request) {
          message += 'A server error occured with no response. \n';
          message += `Request: ${error.request}. \n`;
        } else {
          message += 'An error occured generating the server request. \n';
          message += `Message: ${error.message}`;
        } // end if/else
        this.setState({
          errorMessage: message,
        }); // end setState()
      }); // end catch()
  } // end sendCoinId()


  /**
   * renderButton:
   * This method renders the correct button that either directs user to login
   * page or if logged in: adds or removes the coins.
   */
  renderButton() {
    if (this.state.requestFinished) {
      return 'UPDATING LIST...';
    } // end if

    // message if there is a server request error
    if (this.state.errorMessage) {
      return <h4>{this.state.errorMessage}</h4>;
    } // end if

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

  /**
   * render:
   * Required method of React components to display components called when
   * component is constructed or state is changed.
   */
  render() {
    return (
      <div>
        {this.renderButton()}
      </div>
    ); // end return()
  } // end render()
} // end class AddUserCoin


/**
 * props:
 *
 * Required:
 * coinSymbol - string with symbol of the coin
 * changePageView - function to change App state currentView
 * isLoggedIn - used to initialize login status
 * hasCoin - used to initialize state of whether the user is currently tracking
 *           this coin
 */
AddRemoveUserCoin.propTypes = {
  coinSymbol: PropTypes.string.isRequired,
  changePageView: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  hasCoin: PropTypes.bool.isRequired,
}; // end propTypes


export default AddRemoveUserCoin;
