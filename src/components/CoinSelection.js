/**
 * @file
 * CoinSelection.js
 * This component handles the buttons that are part of the landing page display
 * that show the current price and link to the page view for that coin.
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
  ccApiUrl,
  multiplePriceRoute,
  viewEnum } from '../constants';


export class CoinSelection extends React.Component {
  /**
   * @constructor
   * CoinSelection constructor
   * -iniitializes state properties for coinData array, coinPricesLoaded flag
   *  and error message.
   *
   * @param props: to pass any props to React components
   */
  constructor(props) {
    super(props);

    this.state = {
      coinData: [],
      coinPricesLoaded: false,
      errorMessage: '',
    }; // end state
  } // end constructor


  /**
   * componentWillMount:
   * This is a lifecycle method of React components. It is called once before
   * the component mounts. This component loads the currency name data from the
   * master coin list that was loaded from the backend server when the app
   * started.
   */
  componentWillMount() {
    this.getCoinNames(this.props.coinSymbolsList);
  } // componentWillMount()


  /**
   * componentDidMount:
   * This is a lifecycle method of React components. It is called after the
   * component mounts. This component loads the currency pricing data from the
   * crypto compare API in this method.
   */
  componentDidMount() {
    this.getCoinPrices(this.props.coinSymbolsList);
  } // componentDidMount();


  /**
   * componentWillReceiveProps:
   * This is a lifecycle method of React components. It is called on rerenders
   * and handles possible changes to props. This component reloads the currency
   * name and pricing data from the master coin list and crypto compare API,
   * respectively, if the list of coin symbols prop changes.
   *
   * @param nextProps object that will replace this.props after method
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.coinSymbolsList !== nextProps.coinSymbolsList) {
      // console.log(`CoinSelection.`)
      this.getCoinNames(nextProps.coinSymbolsList);
      this.getCoinPrices(nextProps.coinSymbolsList);
    } // end if
  } // end componentWillRecieveProps()


  /**
   * getCoinNames:
   * This method retrieves the names of the coins for the corresponding symbols
   * in the prop list and adds it to the coinData array.
   *
   * @param coinSymbolsList array of string that are currency symbols
   */
  getCoinNames(coinSymbolsList) {
    const newCoinData = [];

    // get names from master coin list
    for (let i = 0; i < coinSymbolsList.length; i += 1) {
      const newCoin = globalvars.coinList
        .find(coin => coin.symbol === coinSymbolsList[i]);
      if (newCoin) {
        newCoinData
          .push({
            symbol: coinSymbolsList[i],
            name: newCoin.name,
          }); // end push
      } // end if
    } // end for

    this.setState({
      coinData: newCoinData,
    }); // end setState()
  } // end getCoinNames()


  /**
   * getCoinNames:
   * This method retrieves the current prices of the coins for the corresponding
   * symbols in the prop list and adds it to the coinData array.
   *
   * @param coinSymbolsList array of string that are currency symbols
   */
  getCoinPrices(coinSymbolsList) {
    let fsymsParam = '';
    for (let i = 0; i < coinSymbolsList.length; i += 1) {
      fsymsParam += `${coinSymbolsList[i]},`;
    } // end for
    if (!fsymsParam) {
      this.setState({
        errorMessage: 'ADD SOME COINS!',
      }); // end setState()
      return;
    } // end if

    axios.get(
      ccApiUrl + multiplePriceRoute,
      {
        params:
        {
          fsyms: fsymsParam,
          tsyms: 'USD',
        }, // end params
      }, // end anonymous object
    ) // end get()
      .then((response) => {
        // API response for invalid data symbol request
        if (response.data.Response) {
          throw new Error(response.data.Message);
        } // end if

        // add prices to coin data
        const newCoinData = this.state.coinData;
        for (let i = 0; i < newCoinData.length; i += 1) {
          if (response.data[newCoinData[i].symbol]) {
            newCoinData[i].price = response.data[newCoinData[i].symbol].USD;
          } else {
            newCoinData[i].price = null;
          } // end if/else
        } // end for

        this.setState({
          coinData: newCoinData,
          coinPricesLoaded: true,
          errorMessage: '',
        }); // end setState()
      }) // then()
      .catch((error) => {
        let message = '';
        if (error.response) {
          message += 'A server error occured with response: \n';
          message += `Status: ${error.response.status}. \n`;
          message += `Message: ${error.response.data}. \n`;
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
  } // end getCoinPrices()


  /**
   * renderButton:
   * This method renders a button for each of the currencies. The button will
   * have the symbol, name and price of the currency.
   */
  renderButtons() {
    const buttons = [];

    for (let i = 0; i < this.state.coinData.length; i += 1) {
      // build the text string for the button
      let buttonTextLeft = '';
      let buttonTextRight = '';
      buttonTextLeft += `${this.state.coinData[i].symbol}: `;
      buttonTextLeft += `${this.state.coinData[i].name}`;

      if (this.state.coinData[i].price) {
        buttonTextRight += `$${this.state.coinData[i].price}`;
      } else {
        buttonTextRight += 'NO PRICE DATA';
      } // end if/else

      buttons.push((
        <div key={i}>
          <Button
            className="coin-sel-button"
            onClick={
              () => this.props
              .changePageView(viewEnum.COINPAGE, this.state.coinData[i].symbol)
            } // end onClick function
            key={i}
          >
            <div className="coin-sel-button-text">
              <div className="coin-sel-button-left">{buttonTextLeft}</div>
              <div className="coin-sel-button-right">{buttonTextRight}</div>
            </div>
          </Button>
        </div>
      )); // end push()
    } // end for

    return buttons;
  } // end renderButtons()


  /**
   * render:
   * Required method of React components to display components called when
   * component is constructed or state is changed.
   */
  render() {
    // message if waiting for users currencies to load
    if (!this.state.coinPricesLoaded && !this.state.errorMessage) {
      return <h1>loading currencies...</h1>;
    } // end if

    // message if crypto compare request error
    if (this.state.errorMessage) {
      return <h1 className="coin-sel-header">{this.state.errorMessage}</h1>;
    } // end if

    // different heading for logged in user
    const heading = () => {
      if (globalvars.isLoggedIn()) {
        return <h3>YOUR CURRENCIES</h3>;
      }
      return <h3>CURRENCY PICKS</h3>;
    }; // end heading()

    return (
      <div className="coin-sel-container">
        <div className="coin-sel-header">{heading()}</div>
        {this.renderButtons()}
      </div>
    ); // end return
  } // end render()
} // end class CoinSelection


/**
 * props:
 *
 * Required:
 * coinSymbolsList - array of strings that are the symbols of the currencies
 *                   that will be charted
 * changePageView - function to change App state currentView
 */
CoinSelection.propTypes = {
  coinSymbolsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  changePageView: PropTypes.func.isRequired,
}; // end propTypes


export default CoinSelection;
