import React, { Component } from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

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
        <Chart />
      </div>
    );
  }
}

class Chart extends React.Component {
  state = { data : [
      {name: 'Jan 17', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Feb 17', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Mar 17', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Apr 17', uv: 2780, pv: 3908, amt: 2000},
      {name: 'May 17', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Jun 17', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Jul 17', uv: 3490, pv: 4300, amt: 2100},
      {name: 'Aug 17', uv: 2490, pv: 4300, amt: 2100},
      {name: 'Sep 17', uv: 1490, pv: 4300, amt: 2100},
      {name: 'Oct 17', uv: 2790, pv: 4300, amt: 2100},
      {name: 'Nov 17', uv: 3908, pv: 4300, amt: 2100},
      {name: 'Dec 17', uv: 3456, pv: 4300, amt: 2100},
  ]};

  render() {
    return (<LineChart width={600} height={300} data={this.state.data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>);
  }
}

export default App;
