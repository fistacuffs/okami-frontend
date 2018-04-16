/**
 * Chart.js
 *
 * This
 */
import React from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import { ccApiUrl, priceRoute, dailyHistoryRoute } from '../constants';
// import { globalvars } from '../globalvars';

export class Chart extends React.Component {
  static getCoinData() {
    return (
      axios.get(
        ccApiUrl + priceRoute,
        { params: { fsym: 'BTC', tsyms: 'USD' } },
      )
        .then((response) => {
          console.log(`response: ${Object.keys(response)}`);
          console.log(`status: ${response.status}`);
          console.log(`data: ${Object.keys(response.data)}`);
          console.log(`BTC in USD: ${response.data.USD}`);
        })
        .catch((error) => {
          console.log(`response: ${error}`);
        })
    );
  } // end getCoinData


  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  } // end constructor


  componentWillMount() {
    const cp = Chart.getCoinData();
    cp.then(
      () => console.log('coin get complete'),
      () => console.log('coin get failed'),
    );

    const cptoo = this.getAMonthOfCoinData();
    cptoo.then(
      () => console.log('hist coin get complete'),
      () => console.log('hist coin get failed'),
    );
  }// end componentWillMount()


  getAMonthOfCoinData() {
    return (
      axios.get(
        ccApiUrl + dailyHistoryRoute,
        { params: { fsym: 'BTC', tsym: 'USD' } },
      )
        .then((response) => {
          console.log(`hist response: ${Object.keys(response)}`);
          console.log(`hist status: ${response.status}`);
          console.log(`hist data: ${Object.keys(response.data)}`);
          console.log(`day 0: ${response.data.Data[0].time}`);
          console.log(`day 30: ${response.data.Data[30].time}`);

          for (let i = 0; i < response.data.Data.length; i += 1) {
            response.data.Data[i].date =
              (new Date(response.data.Data[i].time * 1000)).toString();
          }
          this.setState({
            data: response.data.Data,
          });
        })
        .catch((error) => {
          console.log(`response: ${error}`);
        })
    );
  } // end getCoinData


  render() {
    return (
      <LineChart
        width={600}
        height={300}
        data={this.state.data}
        margin={{ top: 5, right: 20, bottom: 5 }}
      >
        <Line
          type="monotone"
          dataKey="high"
          stroke="#8884d8"
        />
        <CartesianGrid
          stroke="#ccc"
          strokeDasharray="5 5"
        />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    );
  } // end render()
} // end class Chart

export default Chart;
