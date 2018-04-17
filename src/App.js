import React from 'react';
import axios from 'axios';

import { LandingPage } from './containers/LandingPage';
import { backendUrl, coinListRoute } from './constants';
import { globalvars } from './globalvars';


/* import { LoginPage } from './containers/LoginPage'; */

export class App extends React.Component {
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


  constructor(props) {
    super(props);

    this.state = {
      currentView: (<LandingPage />),
    };
  } // end constructor


  componentWillMount() {
    // loads coinList from backend when App starts
    // coinListPromise used to ensure coinList is loaded
    globalvars.coinListPromise = App.getCoinList();
  } // end componentDidMount()


  render() {
    return (
      <div>
        {this.state.currentView}
      </div>
    );
  } // end render()
} // end class App

export default App;
