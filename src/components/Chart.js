/**
 * Chart.js
 *
 * This is the chart output component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


export const Chart = props => (
  <LineChart
    width={600}
    height={300}
    data={props.data}
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
); // end component Chart


/**
 * props:
 * data - array of objects with the data for chart
 */
Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}; // end propTypes


/**
 * default props:
 * data - empty array
 */
Chart.defaultProps = {
  data: [],
}; // end defaultProps


export default Chart;
