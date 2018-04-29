/**
 * App.js
 */
import React from 'react';
import axios from 'axios';

import { LandingPage } from './containers/LandingPage';
import { CoinPage } from './containers/CoinPage';
import { LoginPage } from './containers/LoginPage';
import { RegistrationPage } from './containers/RegistrationPage';
import { backendUrl, coinListRoute, viewEnum } from './constants';
import { globalvars } from './globalvars';


export class App extends React.Component {
  /**
   * getCoinList:
   */
  static getCoinList() {
    // will return a Promise
    return (
      axios.get(backendUrl + coinListRoute)
        .then((response) => {
          globalvars.coinList = response.data;
        }).catch((error) => {
          // eslint-disable-next-line no-console
          console.log(`Error with get from backend: ${error}`);
        })); // end axios.get()
  } // end getCoinList


  /**
   * @constructor
   * App constructor:
   *
   * @param
   */
  constructor(props) {
    super(props);

    this.state = {
      currentView: viewEnum.LANDINGPAGE,
      coinSymbol: null,
    };

    this.changePageView = this.changePageView.bind(this);
  } // end constructor


  /**
   * componentWillMount:
   */
  componentWillMount() {
    // loads coinList from backend when App starts
    // coinListPromise used to ensure coinList is loaded
    globalvars.coinListPromise = App.getCoinList();
  } // end componentDidMount()


  /**
   * changePageView
   */
  changePageView(newPageView, newCoinSymbol) {
    this.setState({
      currentView: newPageView,
      coinSymbol: newCoinSymbol,
    });
  }


  /**
   * render:
   */
  render() {
    switch (this.state.currentView) {
      case viewEnum.LANDINGPAGE:
        return (
          <LandingPage
            changePageView={this.changePageView}
          />);
      case viewEnum.LOGINPAGE:
        return (
          <LoginPage
            changePageView={this.changePageView}
          />);
      case viewEnum.REGISTRATIONPAGE:
        return (
          <RegistrationPage
            changePageView={this.changePageView}
          />
        );
      case viewEnum.COINPAGE:
        return (
          <CoinPage
            coinSymbol={this.state.coinSymbol}
            changePageView={this.changePageView}
          />);
      default:
        return (
          <LandingPage
            changePageView={this.changePageView}
          />);
    } // end switch()
  } // end render()
} // end class App


export default App;
