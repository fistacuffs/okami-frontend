/**
 * MultiCoinGroup.js
 *
 * This component coordinates the multiple currencies that will be displayed
 * between the chart terminal and coin selection components.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row } from 'reactstrap';

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


export class MultiCoinGroup extends React.Component {
  /**
   * @constructor
   *
   */
  constructor(props) {
    super(props);

    this.state = {
      coinSymbolsList: [],
    }; // end state
  } // end constructor


  /**
   * componentDidMount:
   * This method is called when the component is mounted. This component uses it
   * to create the list of coin symbols to pass to the chart terminal and coin
   * selection components.
   */
  componentWillMount() {
    this.generateSymbolsList();
  } // end componentDidMount()


  /**
   * generateSymbolsList:
   * This method generates the symbols list for the coinSybolsList state. If no
   * user is logged in, random symbols from the master coin list are selected.
   */
  generateSymbolsList() {
    let list = [];

    if (globalvars.isLoggedIn()) {
      for (let i = 0; i < globalvars.userCoinList.length; i += 1) {
        list.push(globalvars.coinList
          .find(coin => coin.id === globalvars.userCoinList[i]).symbol);
      } // end for
      console.log(`MultiCoinGroup.generateSymbolsList: loggedIn: list: ${list}`);
    } else {
      const indices = getRandomIndices(5, globalvars.coinList.length);
      list = indices.map(index => globalvars.coinList[index].symbol);
    } // end if/else

    this.setState({
      coinSymbolsList: list,
    }); // end setState()
  } // end generateSymbolsList()


  /**
   * render:
   * Required method of React components to display components called when
   * component is constructed or state is changed.
   */
  render() {
    return (
      <div className="multi-coin-group">
        <Row>
          <Col>
            <ChartTerminal coinSymbolsList={this.state.coinSymbolsList} />
          </Col>
          <Col>
            <CoinSelection
              coinSymbolsList={this.state.coinSymbolsList}
              changePageView={this.props.changePageView}
            />
          </Col>
        </Row>
      </div>
    ); // end return()
  } // end render()
} // end class MultiCoinGroup


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
