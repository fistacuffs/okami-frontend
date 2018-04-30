/**
 * MultiCoinGroup.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Col,
  Container,
  Row } from 'reactstrap';

import { ChartTerminal } from './ChartTerminal';
import { CoinSelection } from './CoinSelection';
import { globalvars } from '../globalvars';
import { ccApiUrl, multiplePriceRoute } from '../constants';


const getRandomIndices = (num, arraySize) => {
  const indices = [];
  let i = 0;

  while (i < num) {
    const randIndex = Math.floor(Math.random() * arraySize);
    if (indices.find(index => index === randIndex)) {
      indices.push(randIndex);
      i += 1;
    } // end if
  } // end while

  return indices;
}; // end getRandomIndices


export class MultiCoinGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coinData: [],
    };
  } // end constructor


  /**
   * componentWillMount:
   *
   */
  componentWillMount() {
    console.log('INSIDE COMPONENT WILL MOUNT');
    const promise = this.getCoinData();
    promise.catch(error => `Error with Crypto Compare: ${error}`);
  } //  end componentWillMount()


  /**
   * getCoinData:
   *
   */
  getCoinData() {
    console.log('INSIDE GET COIN DATA');
    return (Promise
      .all(globalvars.coinListPromise, globalvars.userCoinListPromise)
      .then(() => {
        console.log('INDSIDE PROMISES');
        let coinParams = '';

        if (globalvars.isLoggedIn()) {
          for (let i = 0; i < globalvars.userCoinList.length; i += 1) {
            coinParams +=
                `${globalvars.coinList.find(coin =>
                  coin.id === globalvars.userCoinList[i]).symbol},`;
          } // end for
        } else {
          const randIndices = getRandomIndices(5, globalvars.coinList.length);
          for (let i = 0; i < 5; i += 1) {
            const index = randIndices[i];
            coinParams += `${globalvars.coinList[index].symbol},`;
          } // end for
        } // end if/else

        console.log(`coin params: ${coinParams}`);

        return axios.get(
          ccApiUrl + multiplePriceRoute,
          {
            params: {
              fsyms: coinParams,
              tsyms: 'USD',
            },
          }, // end get params
        ) // end get()
          .then((response) => {
            console.log(JSON.stringify(response));
            const [...coinData] = this.state.coinData;
            const keys = Object.keys(response.data);
            for (let i = 0; i < keys.length; i += 1) {
              const currSymbol = keys[i];
              coinData[i] = {
                name: globalvars.coinList
                  .find(coin => coin.symbol === currSymbol),
                symbol: currSymbol,
                price: response.data[`${currSymbol}`].USD,
              }; // end coinData
            } // end for
            console.log(`coinData: ${coinData}`);

            this.setState({ coinData }); // end setState()
          }) // end then()
          .catch((error) => {
            console.log(`Error with get from Crypto Compare: ${error}`);
          }); // end axios.get()
      }) // end then()
    );
  } // end getCoinData


  render() {
    console.log('INSIDE RENDER MCG');
    console.log(`coindata: ${JSON.stringify(this.state.coinData)}`);

    return (
      <Container>
        <Row>
          <Col>
            <ChartTerminal coinSymbol="BTC" />
          </Col>
          <Col>
            <CoinSelection
              coinData={this.state.coinData}
              changePageView={this.props.changePageView}
            />
          </Col>
        </Row>
      </Container>
    );
  } // end render()
} // end class MultiCoinGroup


MultiCoinGroup.propTypes = {
  changePageView: PropTypes.func.isRequired,
}; // end propTypes


export default MultiCoinGroup;
