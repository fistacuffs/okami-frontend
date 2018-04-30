/**
 * CoinSelection.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Row } from 'reactstrap';

import { globalvars } from '../globalvars';
import { ccApiUrl, multiplePriceRoute, viewEnum } from '../constants';


export class CoinSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coinData: [],
      coinPricesLoaded: false,
    }; // end state
  } // end constructor


  getCoinNames() {
    const newCoinData = [];

    // get names from master coin list
    for (let i = 0; i < this.props.coinSymbolsList; i += 1) {
      newCoinData
        .push({
          symbol: this.props.coinSymbolsList[i],
          name: globalvars.coinList
            .find(coin => coin.symbol === this.props.coinSymbolsList[i]).name,
        }); // end push
    } // end for

    this.setState({
      coinData: newCoinData,
    }); // end setState()
  } // end getCoinNames()


  getCoinPrices() {
    axios.get(
      ccApiUrl + multiplePriceRoute,
      {
        params:
        {
          fsyms: JSON.stringify(this.props.coinSymbolsList),
          tsyms: 'USD',
        }, // end params
      }, // end anonymous object
    ) // end get()
      .then()
      .catch();
  } // end getCoinPrices()


  renderButtons() {
    const buttons = [];

    for (let i = 0; i < this.state.coinData.length; i += 1) {
      const buttonText =
        `${this.state.coinData[i].symbol}:` +
        `${this.state.coinData[i].name}     `;
        // `$${this.state.coinData[i].price}`;

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
    if (!this.state.coinPricesLoaded) {
      return (<h1>loading currencies...</h1>);
    } // end if

    const heading = () => {
      if (globalvars.isLoggedIn()) {
        return <h3>YOUR CURRENCIES</h3>;
      }
      return <h3>CURRENCIES</h3>;
    }; // end heading()

    return (
      <div className="coin-selection">
        {heading()}
      </div>
    ); // end return
  } // end render()
} // end class CoinSelection


CoinSelection.propTypes = {
  coinSymbolsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  changePageView: PropTypes.func.isRequired,
}; // end propTypes


export default CoinSelection;
