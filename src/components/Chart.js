/**
 * @file
 * Chart.js
 * This is the chart output component. It displays lines for one or more
 * currencies depending on the data array prop.
 *
 * @author Nicholas Weitzel
 * @since 1.0.0
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Legend,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip } from 'recharts';


/**
 * getRandomColor:
 * This method generates random css-style hex strings for colors.
 *
 * @returns string representing a css hex color
 */
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  } // end for
  return color;
}; // end getRandomColor()


export class Chart extends React.Component {
  /**
   * renderLines:
   * This method generates one or more JSX line objects for each currency key
   * represented in the data object.
   *
   * @returns array of one or more Line components to be inserted as child
   *          components of the LineChart component
   */
  renderLines() {
    // check for empty data array
    if (!this.props.data[0]) {
      return [];
    } // end if

    // initialize line array and get the keys for each currency with pricing
    // data
    const lines = [];
    const keys = Object.keys(this.props.data[0]);

    // push a JSX line object to the array for each currency key
    for (let i = 0; i < keys.length; i += 1) {
      // ignore the date key here
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


  /**
   * render:
   * Required method of React components to display components called when
   * component is constructed or state is changed.
   */
  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
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
      </ResponsiveContainer>
    ); // end return()
  } // end render()
} // end class Chart


/**
 * props:
 * data - array of objects with the data for chart, objects will have one date
 *        key and one or more keys for a currency closing price on that date
 */
Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}; // end propTypes


export default Chart;
