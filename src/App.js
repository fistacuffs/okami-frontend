import React from 'react';
import axios from 'axios';

import { LandingPage } from './containers/LandingPage';
import { backendUrl, coinListRoute } from './constants';
import { globalvars } from './globalvars';


/* import { LoginPage } from './containers/LoginPage'; */

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: (<LandingPage />),
      coinListLoaded: false,
    };
  } // end constructor


  componentDidMount() {
    axios.get(backendUrl + coinListRoute)
      .then((response) => {
        if (!this.state.coinListLoaded) {
          this.setState({ coinListLoaded: true });
        } // end if
        globalvars.coinList = response.data;
        globalvars.coinList.forEach((coin) => {
          console.log(coin);
        });
      }).catch((error) => {
        if (this.state.coinListLoaded) {
          this.setState({ coinListLoaded: false });
        } // end if
        console.log(`error = ${error}`);
      }); // end axios.get()
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
