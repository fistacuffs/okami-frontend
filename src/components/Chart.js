/**
 * Chart.js
 *
 * This is the chart output component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Legend,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip } from 'recharts';


const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}; // end getRandomColor()


export class Chart extends React.Component {
  renderLines() {
    if (!this.props.data[0]) {
      return [];
    } // end if

    const lines = [];
    const keys = Object.keys(this.props.data[0]);

    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i] !== 'date') {
        lines.push((
          <Line
            type="monotone"
            dataKey={keys[i]}
            stroke={getRandomColor()}
            key={i}
          />
        )); // end push()
      } // end if
    } // end for

    return lines;
  } // end renderLines()


  render() {
    return (
      <LineChart
        width={800}
        height={300}
        data={this.props.data}
        margin={{ top: 5, right: 20, bottom: 5 }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid
          stroke="#ccc"
          strokeDasharray="5 5"
        />
        <Tooltip />
        <Legend />
        {this.renderLines()}
      </LineChart>
    ); // end return()
  } // end render()
} // end class Chart


/**
 * props:
 * data - array of objects with the data for chart
 */
Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}; // end propTypes


export default Chart;
