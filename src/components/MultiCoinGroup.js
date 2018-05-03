/**
 * MultiCoinGroup.js
 *
 * This component coordinates the multiple currencies that will be displayed
 * between the chart terminal and coin selection components.
 */
import React from 'react';
import PropTypes from 'prop-types';

import { ChartTerminal } from './ChartTerminal';
import { CoinSelection } from './CoinSelection';

import { globalvars } from '../globalvars';


/**
 * getRandomIndices:
 * This is a utility method that selects several random and unique indices for
 * an array and returns them as an array of numbers. This will be used by the
 * component to select random currencies if a user is not logged in.
 *
 * @param numIndices the number of unique random indices needed
 * @param arraySize the size of the array for which indices are needed
 *
 * @return an array of numbers that is the list of unique random indices
 */
const getRandomIndices = (numIndices, arraySize) => {
  const indices = [];
  let i = 0;

  while (i < numIndices) {
    // generate random index
    const randIndex = Math.floor(Math.random() * arraySize);
    // make sure index is unique
    if (!(indices.find(index => index === randIndex))) {
      indices.push(randIndex);
      i += 1;
    } // end if
  } // end while

  return indices;
}; // end getRandomIndices


/**
 * generateSymbolsList:
 * This method generates the symbols list for the coinSybolsList state. If no
 * user is logged in, random symbols from the master coin list are selected.
 */
const generateSymbolsList = () => {
  let list = [];

  // use all coins from user list if a user is logged in
  if (globalvars.isLoggedIn()) {
    for (let i = 0; i < globalvars.userCoinList.length; i += 1) {
      list.push(globalvars.coinList
        .find(coin => coin.id === globalvars.userCoinList[i]).symbol);
    } // end for
  // otherwise use five randomly selected coins from the master list
  } else {
    const indices = getRandomIndices(5, globalvars.coinList.length);
    list = indices.map(index => globalvars.coinList[index].symbol);
  } // end if/else

  return list;
}; // end generateSymbolsList()


export const MultiCoinGroup = (props) => {
  const coinSymbolsList = generateSymbolsList();

  return (
    <div className="mcg-container">
      <div className="mcg-chart-container">
        <ChartTerminal coinSymbolsList={coinSymbolsList} />
      </div>
      <div className="mcg-coin-sel-container">
        <CoinSelection
          coinSymbolsList={coinSymbolsList}
          changePageView={props.changePageView}
        />
      </div>
    </div>
  ); // end return()
}; // end MultiCoinGroup


/**
 * props:
 *
 * Required:
 * changePageView - function to change App state currentView
 */
MultiCoinGroup.propTypes = {
  changePageView: PropTypes.func.isRequired,
}; // end propTypes


export default MultiCoinGroup;
