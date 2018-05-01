/**
 * CoinSelection.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Button,
  Row } from 'reactstrap';

import { globalvars } from '../globalvars';
import {
  ccApiUrl,
  multiplePriceRoute,
  viewEnum } from '../constants';


export class CoinSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coinData: [],
      coinPricesLoaded: false,
      errorMessage: '',
    }; // end state
  } // end constructor


  componentWillMount() {
    this.getCoinNames(this.props.coinSymbolsList);
  } // componentWillMount()


  componentDidMount() {
    this.getCoinPrices(this.props.coinSymbolsList);
  } // componentDidMount();


  componentWillReceiveProps(nextProps) {
    if (this.props.coinSymbolsList !== nextProps.coinSymbolsList) {
      // console.log(`CoinSelection.`)
      this.getCoinNames(nextProps.coinSymbolsList);
      this.getCoinPrices(nextProps.coinSymbolsList);
    } // end if
  } // end componentWillRecieveProps()


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


  renderButtons() {
    const buttons = [];

    for (let i = 0; i < this.state.coinData.length; i += 1) {
      let buttonText = '';
      buttonText += `${this.state.coinData[i].symbol}: `;
      buttonText += `${this.state.coinData[i].name}     `;
      if (this.state.coinData[i].price) {
        buttonText += `$${this.state.coinData[i].price}`;
      } else {
        buttonText += 'NO PRICE DATA';
      } // end if/else

      buttons.push((
        <Row key={i}>
          <Button
            className="coin-button"
            onClick={
              () => this.props
              .changePageView(viewEnum.COINPAGE, this.state.coinData[i].symbol)
            } // end onClick function
            key={i}
          >
            {buttonText}
          </Button>
        </Row>
      )); // end push()
    } // end for

    return buttons;
  } // end renderButtons()


  render() {
    // message if waiting for users currencies to load
    if (!this.state.coinPricesLoaded && !this.state.errorMessage) {
      return <h1>loading currencies...</h1>;
    } // end if

    // message if crypto compare request error
    if (this.state.errorMessage) {
      return <h4>{this.state.errorMessage}</h4>;
    } // end if

    // different heading for logged in user
    const heading = () => {
      if (globalvars.isLoggedIn()) {
        return <h3>YOUR CURRENCIES</h3>;
      }
      return <h3>CURRENCY PICKS</h3>;
    }; // end heading()

    return (
      <div className="coin-selection">
        {heading()}
        {this.renderButtons()}
      </div>
    ); // end return
  } // end render()
} // end class CoinSelection


CoinSelection.propTypes = {
  coinSymbolsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  changePageView: PropTypes.func.isRequired,
}; // end propTypes


export default CoinSelection;
