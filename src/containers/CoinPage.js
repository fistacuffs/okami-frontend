/**
 * CoinPage.js
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row } from 'reactstrap';

import { NavBar } from './NavBar';
import { Header } from './Header';
import { Display } from './Display';
import { Footer } from './Footer';
import { ChartTerminal } from '../components/ChartTerminal';
import { AddRemoveUserCoin } from '../components/AddRemoveUserCoin';
import { globalvars } from '../globalvars';


export const hasCoin = (coinSymbol) => {
  if (!globalvars.isLoggedIn()) {
    return false;
  } // end if

  // convert coin ids to symbols
  const userCoinSymbolsList =
    globalvars.userCoinList
      .map(coinId => globalvars.coinList
        .find(coin => coin.id === coinId).symbol);

  // see if user has coin in their list
  if (userCoinSymbolsList.find(listSymbol => listSymbol === coinSymbol)) {
    return true;
  } // end if

  return false;
}; // end hasCoin()


export const CoinPage = props => (
  <div>
    <NavBar
      changePageView={props.changePageView}
    />
    <Header
      changePageView={props.changePageView}
    />
    <Display>
      <Row><Col /><Col><h1>{props.coinSymbol}</h1></Col><Col /></Row>
      <Row>
        <Col><ChartTerminal coinSymbolsList={[props.coinSymbol]} /></Col>
      </Row>
      <Row />
      <Row>
        <Col /><Col />
        <Col>
          <AddRemoveUserCoin
            coinSymbol={props.coinSymbol}
            changePageView={props.changePageView}
            isLoggedIn={globalvars.isLoggedIn()}
            hasCoin={hasCoin(props.coinSymbol)}
          />
        </Col>
        <Col /><Col />
      </Row>
    </Display>
    <Footer>
      CMSC 495 (7982) Group 1
    </Footer>
  </div>
);


CoinPage.propTypes = {
  coinSymbol: PropTypes.string.isRequired,
  changePageView: PropTypes.func.isRequired,
}; // end propTypes


export default CoinPage;
