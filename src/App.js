import React, { Component } from 'react';
import axios from 'axios';

import logo from './okami_logo_small.png';
import samplePage from './okami_mockup.png';
import './App.css';

class App extends Component {
  constructor() {
      super();
      this.state = {
        coinlist: ''
      };

      this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    axios.get('https://mighty-fortress-28903.herokuapp.com/?action=coinlist').then(response => console.log(response));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Okami Mockup</h1>
        </header>
        <p className="App-intro">
          Here is the mockup
        </p>
        <div>
          <img src={samplePage} alt="sample page" />
        </div>
        <div className='button_container'>
          <button className='button' onClick={this.handleClick}>
            Click Me
          </button>
        </div>
      </div>
    );
  }
}

export default App;
