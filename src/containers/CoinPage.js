/**
 * CoinPage.js
 *
 * This is page view displays more detailed information about a single currency.
 * In this view, the user can add or remove the currency from their list if they
 * are logged in.
 */
import React from 'react';
import PropTypes from 'prop-types';

import { NavBar } from './NavBar';
import { Header } from './Header';
import { Display } from './Display';
import { Footer } from './Footer';
import { ChartTerminal } from '../components/ChartTerminal';
import { AddRemoveUserCoin } from '../components/AddRemoveUserCoin';
import { CoinDetails } from '../components/CoinDetails';

import { globalvars } from '../globalvars';

import './Containers.css';


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


export const CoinPage = props => (
  <div>
    <NavBar
      changePageView={props.changePageView}
    />
    <Header
      changePageView={props.changePageView}
    />
    <Display>
      <div className="coin-page-display-flex-box">
        <div className="coin-page-details-div">
          <CoinDetails coinSymbol={props.coinSymbol} />
        </div>
        <div className="coin-page-chart-div">
          <ChartTerminal coinSymbolsList={[props.coinSymbol]} />
        </div>
      </div>
      <div className="coin-page-add-remove-button-div">
        <AddRemoveUserCoin
          coinSymbol={props.coinSymbol}
          changePageView={props.changePageView}
          isLoggedIn={globalvars.isLoggedIn()}
          hasCoin={hasCoin(props.coinSymbol)}
        />
      </div>
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
