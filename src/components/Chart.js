/**
 * Chart.js
 *
 * This
 */
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data:
      [
        {
          name: 'Jan 17',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Feb 17',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Mar 17',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Apr 17',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'May 17',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Jun 17',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Jul 17',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
        {
          name: 'Aug 17',
          uv: 2490,
          pv: 4300,
          amt: 2100,
        },
        {
          name: 'Sep 17',
          uv: 1490,
          pv: 4300,
          amt: 2100,
        },
        {
          name: 'Oct 17',
          uv: 2790,
          pv: 4300,
          amt: 2100,
        },
        {
          name: 'Nov 17',
          uv: 3908,
          pv: 4300,
          amt: 2100,
        },
        {
          name: 'Dec 17',
          uv: 3456,
          pv: 4300,
          amt: 2100,
        },
      ],
    };
  } // end constructor

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
          dataKey="uv"
          stroke="#8884d8"
        />
        <CartesianGrid
          stroke="#ccc"
          strokeDasharray="5 5"
        />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    );
  } // end render()
} // end class Chart

export default Chart;
