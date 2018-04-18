/**
 * CoinSelection.js
 */
import React from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Row } from 'reactstrap';

import { globalvars } from '../globalvars';
import { ccApiUrl, multiplePriceRoute } from '../constants';


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


  render() {
    return (
      <div className="coin-selection">
        <h3>POPULAR CURRENCIES</h3>
        <Row>
          <Button className="coin-button">
            {this.state.buttonStrings[0]}
          </Button>
        </Row>
        <Row>
          <Button className="coin-button">
            {this.state.buttonStrings[1]}
          </Button>
        </Row>
        <Row>
          <Button className="coin-button">
            {this.state.buttonStrings[2]}
          </Button>
        </Row>
        <Row>
          <Button className="coin-button">
            {this.state.buttonStrings[3]}
          </Button>
        </Row>
        <Row>
          <Button className="coin-button">
            {this.state.buttonStrings[4]}
          </Button>
        </Row>
      </div>
    );
  } // end render()
} // end class CoinSelection


/* CoinSelection.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.object),
};


CoinSelection.defaultProps = {
  coins: [],
}; */

export default CoinSelection;
