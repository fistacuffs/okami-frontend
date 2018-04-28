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

    this.changeViewToLandingPage =
      this.changeViewToLandingPage.bind(this);
    this.changeViewToLoginPage =
      this.changeViewToLoginPage.bind(this);
    this.changeViewToRegistrationPage =
      this.changeViewToRegistrationPage.bind(this);
    this.changeViewToCoinPage =
      this.changeViewToCoinPage.bind(this);
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
   * changeViewToLandingPage:
   */
  changeViewToLandingPage() {
    this.setState({
      currentView: viewEnum.LANDINGPAGE,
    }); // end setState()
  } // end changeView()


  /**
   * changeViewToCoinPage:
   */
  changeViewToCoinPage(newCoinSymbol) {
    this.setState({
      currentView: viewEnum.COINPAGE,
      coinSymbol: newCoinSymbol,
    });
  } // end changeView()


  /**
   * changeViewToLoginPage:
   */
  changeViewToLoginPage() {
    this.setState({
      currentView: viewEnum.LOGINPAGE,
    }); // end setState()
  } // end changeView()


  /**
   * changeViewToLoginPage:
   */
  changeViewToRegistrationPage() {
    this.setState({
      currentView: viewEnum.REGISTRATIONPAGE,
    }); // end setState()
  } // end changeView()


  /**
   * render:
   */
  render() {
    switch (this.state.currentView) {
      case viewEnum.LANDINGPAGE:
        return (
          <LandingPage
            changeViewToLandingPage={this.changeViewToLandingPage}
            changeViewToLoginPage={this.changeViewToLoginPage}
            changeViewToRegistrationPage={this.changeViewToRegistrationPage}
            changeViewToCoinPage={this.changeViewToCoinPage}
          />);
      case viewEnum.LOGINPAGE:
        return (
          <LoginPage
            changeViewToLandingPage={this.changeViewToLandingPage}
            changeViewToLoginPage={this.changeViewToLoginPage}
            changeViewToRegistrationPage={this.changeViewToRegistrationPage}
          />);
      case viewEnum.REGISTRATIONPAGE:
        return (
          <RegistrationPage
            changeViewToLandingPage={this.changeViewToLandingPage}
            changeViewToLoginPage={this.changeViewToLoginPage}
            changeViewToRegistrationPage={this.changeViewToRegistrationPage}
          />
        );
      case viewEnum.COINPAGE:
        return (
          <CoinPage
            coinSymbol={this.state.coinSymbol}
            changeViewToLandingPage={this.changeViewToLandingPage}
            changeViewToLoginPage={this.changeViewToLoginPage}
            changeViewToRegistrationPage={this.changeViewToRegistrationPage}
          />);
      default:
        return (
          <LandingPage
            changeViewToLoginPage={this.changeViewToLoginPage}
          />);
    } // end switch()
  } // end render()
} // end class App

export default App;
