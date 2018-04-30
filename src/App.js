/**
 * App.js
 *
 * This is the top level container of the application. The logic and state of
 * switching between different page views is handled here. The initialization
 * of the master coin list loaded from the backend server is done here as well.
 */
import React from 'react';
import axios from 'axios';

import { LandingPage } from './containers/LandingPage';
import { CoinPage } from './containers/CoinPage';
import { LoginPage } from './containers/LoginPage';
import { RegistrationPage } from './containers/RegistrationPage';
import { ErrorPage } from './containers/ErrorPage';
import { LoadingPage } from './containers/LoadingPage';

import { backendUrl, coinListRoute, viewEnum } from './constants';
import { globalvars } from './globalvars';


export class App extends React.Component {
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
      coinListLoaded: false,
      errorMessage: '',
    }; // end state

    this.changePageView = this.changePageView.bind(this);
  } // end constructor


  /**
   * componentWillMount:
   * This method is called when the component is mounted. This component uses it
   * to load the master coin list from the backend server.
   */
  componentDidMount() {
    globalvars.coinListPromise = this.getCoinList();
  } // end componentDidMount()


  /**
   * getCoinList:
   * This method handles the get request to the backend server to load the
   * master coin list.
   */
  getCoinList() {
    axios.get(backendUrl + coinListRoute) // end get()
      .then((response) => {
        globalvars.coinList = response.data;
        this.setState({
          coinListLoaded: true,
        }); // end setState()
      }) // end then()
      .catch((error) => {
        let message = '';
        if (error.response) {
          message += 'A server error occured with response: \n';
          message += `Status: ${error.response.status}. \n`;
          message += `Message: ${error.response.data}. \n`;
        } else if (error.request) {
          message += 'A server error occured with no response. \n';
          message += `Request: ${error.request}. \n`;
        } else {
          message += 'An error occured generating the server request. \n';
          message += `Message: ${error.message}`;
        } // end if/else
        this.setState({
          errorMessage: message,
          currentView: viewEnum.ERRORPAGE,
        }); // end then()
      }); // end catch()
  } // end getCoinList


  /**
   * changePageView:
   * This method will be used to change the page view state by other components.
   *
   * @param newPageView a viewEnum corresponding to one of the individual page
   *                    views
   * @param newCoinSymbol *optional* string to be used specifically by the
   *                      coin page view
   */
  changePageView(newPageView, newCoinSymbol) {
    this.setState({
      currentView: newPageView,
      coinSymbol: newCoinSymbol,
    }); // end setState()
  } // end changePageView()


  /**
   * render:
   * Required method of React components to display components called when
   * component is constructed or state is changed.
   */
  render() {
    // check if master coin list is still loading from backend server
    if (!this.state.coinListLoaded) {
      return <LoadingPage changePageView={this.changePageView} />;
    } // end if

    switch (this.state.currentView) {
      case viewEnum.LANDINGPAGE:
        return <LandingPage changePageView={this.changePageView} />;
      case viewEnum.LOGINPAGE:
        return <LoginPage changePageView={this.changePageView} />;
      case viewEnum.REGISTRATIONPAGE:
        return <RegistrationPage changePageView={this.changePageView} />;
      case viewEnum.COINPAGE:
        return (
          <CoinPage
            coinSymbol={this.state.coinSymbol}
            changePageView={this.changePageView}
          />
        ); // end return()
      case viewEnum.ERRORPAGE:
        return <ErrorPage message={this.state.errorMessage} />;
      default:
        return <ErrorPage message="ERROR: UNREACHABLE PAGE" />;
    } // end switch()
  } // end render()
} // end class App


export default App;
