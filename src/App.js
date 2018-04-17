/**
 * App.js
 */
import React from 'react';
import axios from 'axios';

import { LandingPage } from './containers/LandingPage';
import { LoginPage } from './containers/LoginPage';
import { backendUrl, coinListRoute, viewEnum } from './constants';
import { globalvars } from './globalvars';
/* import { LoginPage } from './containers/LoginPage'; */


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
    };

    this.changeViewToLandingPage = this.changeViewToLandingPage.bind(this);
    this.changeViewToLoginPage = this.changeViewToLoginPage.bind(this);
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
   * changeViewToLoginPage:
   */
  changeViewToLoginPage() {
    this.setState({
      currentView: viewEnum.LOGINPAGE,
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
            changeViewToLoginPage={this.changeViewToLoginPage}
          />);
      case viewEnum.LOGINPAGE:
        return (
          <LoginPage
            changeViewToLandingPage={this.changeViewToLandingPage}
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
