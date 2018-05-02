/**
 * CoinPage.js
 *
 * This is page view displays more detailed information about a single currency.
 * In this view, the user can add or remove the currency from their list if they
 * are logged in.
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


/**
 * hasCoin:
 * This is a utility method used to test if a logged in user has this coin in
 * their list already. The page view will use it initialize the add/remove
 * button.
 *
 * @returns true if a user is logged in and the coin is in their list
 *          false otherwise
 */
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


/**
 * getCoinName:
 * This method uses the coin symbol to retrieve the string name from the master
 * coin list.
 *
 * @param symbol symbol string of a currency
 * @returns name string of currency with that symbol
 */
const getCoinName = symbol =>
  globalvars.coinList.find(coin => coin.symbol === symbol).name;


export const CoinPage = props => (
  <div>
    <NavBar
      changePageView={props.changePageView}
    />
    <Header
      changePageView={props.changePageView}
    />
    <Display>
      <Row><Col /><Col><h1>{getCoinName(props.coinSymbol)}</h1></Col><Col /></Row>
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
      <h3>CMSC 495 (7982) Group 1</h3>
    </Footer>
  </div>
); // end CoinPage


/**
 * props:
 *
 * Required:
 * coinSymbol - symbol string for currency
 * changePageView - function to change App state currentView
 */
CoinPage.propTypes = {
  coinSymbol: PropTypes.string.isRequired,
  changePageView: PropTypes.func.isRequired,
}; // end propTypes


export default CoinPage;
