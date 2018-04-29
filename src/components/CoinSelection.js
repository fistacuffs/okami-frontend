/**
 * CoinSelection.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Row } from 'reactstrap';

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
      buttonStrings: [],
    };
  } // end constructor


  /**
   * componentWillMount:
   *
   */
  componentWillMount() {
    const promise = this.getCoinData();
    promise.catch(error => `Error with Crypto Compare: ${error}`);
  } //  end componentWillMount()


  /**
   * getCoinData:
   *
   */
  getCoinData() {
    return globalvars.coinListPromise.then(

      () => {
        // coin parameter list for get request
        const coinsParam =
          `${globalvars.coinList[0].symbol},` +
          `${globalvars.coinList[1].symbol},` +
          `${globalvars.coinList[2].symbol},` +
          `${globalvars.coinList[3].symbol},` +
          `${globalvars.coinList[4].symbol}`;

        axios.get(
          ccApiUrl + multiplePriceRoute,
          {
            params: {
              fsyms: coinsParam,
              tsyms: 'USD',
            },
          }, // end get params
        ) // end get()
          .then((response) => {
            const [...coinData] = this.state.coinData;
            for (let i = 0; i < 5; i += 1) {
              const currSymbol = globalvars.coinList[i].symbol;
              coinData[i] = {
                name: globalvars.coinList[i].name,
                symbol: currSymbol,
                price: response.data[`${currSymbol}`].USD,
              };
            } // end for

            this.setState({ coinData }); // end setState()

            const [...buttonStrings] = this.state.buttonStrings;
            for (let i = 0; i < 5; i += 1) {
              buttonStrings[i] =
                `${this.state.coinData[i].symbol}:` +
                `${this.state.coinData[i].name}     ` +
                `$${this.state.coinData[i].price}`;
            } // end for
            this.setState({ buttonStrings });
          }) // end then()
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(`Error with get from Crypto Compare: ${error}`);
          }); // end axios.get()
      },
      // end promise.onSuccessful()

      // eslint-disable-next-line no-console
      () => console.log('Error with coin list'),
      // end promise.onRejected()

    ); // end promise.then()
  } // end getCoinData


  renderButtons() {
    const buttons = [];

    for (let i = 0; i < this.state.buttonStrings.length; i += 1) {
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
            {this.state.buttonStrings[i]}
          </Button>
        </Row>
      ));
    } // end for

    return buttons;
  } // end makeButtons()


  render() {
    return (
      <div className="coin-selection">
        <h3>POPULAR CURRENCIES</h3>
        {this.renderButtons()}
      </div>
    );
  } // end render()
} // end class CoinSelection


CoinSelection.propTypes = {
  changePageView: PropTypes.func.isRequired,
};

/*
CoinSelection.defaultProps = {
  coins: [],
}; */

export default CoinSelection;
