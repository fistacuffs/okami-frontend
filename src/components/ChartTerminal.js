/**
 * ChartTerminal.js
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Button,
  Col,
  Row } from 'reactstrap';

import { Chart } from './Chart';
import {
  ccApiUrl,
  dailyHistoryRoute,
  WEEK,
  MONTH,
  YEAR } from '../constants';


export class ChartTerminal extends React.Component {
  /**
   * ChartTerminal constructor
   * -iniitializes state properties for timeFrame and data array
   * -binds methods changeTimeFrameToYearToWeek, changeTimeFrameToMonth, and
   *  changeTimeFrameToYear to this
   *  component
   *
   * @param: to pass any props to React components
   */
  constructor(props) {
    super(props);

    this.state = {
      timeFrame: MONTH,
      chartData: [],
      coinDataLoaded: false,
      errorMessage: '',
    };

    this.changeTimeFrameToWeek = this.changeTimeFrameToWeek.bind(this);
    this.changeTimeFrameToMonth = this.changeTimeFrameToMonth.bind(this);
    this.changeTimeFrameToYear = this.changeTimeFrameToYear.bind(this);
  } // end constructor


  /**
   * componentDidMount:
   *
   */
  componentDidMount() {
    this.getCoinData(this.props.coinSymbolsList);
  } //  end componentDidMount()


  componentWillReceiveProps(nextProps) {
    if (this.props.coinSymbolsList !== nextProps.coinSymbolsList) {
      this.getCoinData(nextProps.coinSymbolsList);
    } // end if
  } // end componentWillRecieveProps()


  /**
   * getCoinData:
   *
   */
  getCoinData(coinSymbolsList) {
    // combine all requests into one promise
    const requests = [];
    for (let i = 0; i < coinSymbolsList.length; i += 1) {
      requests.push(axios.get(
        ccApiUrl + dailyHistoryRoute,
        {
          params: {
            fsym: coinSymbolsList[i],
            tsym: 'USD',
            limit: YEAR,
          }, // end params
        }, // end anonymous object
      )); // end get()
    } // end for

    Promise.all(requests).then((response) => {
      const newCoinData = [];

      for (let i = 0; i < response.length; i += 1) {
        if (response[i].data.Data) {
          // only add date once
          if (!newCoinData[0]) {
            for (let j = 0; j < response[i].data.Data.length; j += 1) {
              newCoinData.push({
                date: new Date(response[i].data.Data[j].time * 1000)
                  .toDateString(),
              }); // end push()
            } // end for
          } // end if

          // add price data
          for (let j = 0; j < response[i].data.Data.length; j += 1) {
            newCoinData[j][coinSymbolsList[i]] =
              response[i].data.Data[j].close;
          } // end for
        } // end if
      } // end for

      this.setState({
        chartData: newCoinData,
        coinDataLoaded: true,
      }); // end setState()
    }) // end then()
      .catch((error) => {
        let message = '';
        if (error.response) {
          message += 'A server error occured with response: \n';
          message += `Status: ${error.response.status}. \n`;
          message += `Message: ${error.response.data}. \n`;
        } // end if

        this.setState({
          errorMessage: message,
        }); // end setState()
      }); // end catch()
  } // end getCoinData


  /**
   * changeTimeFrameToWeek:
   * This method will be passed to a button to change timeFrame state property
   * to one week.
   */
  changeTimeFrameToWeek() {
    this.setState({
      timeFrame: WEEK,
    });
  } // end changeTimeFrameToWeek()


  /**
   * changeTimeFrameToMonth:
   * This method will be passed to a button to change timeFrame state property
   * to one month.
   */
  changeTimeFrameToMonth() {
    this.setState({
      timeFrame: MONTH,
    });
  } // end changeTimeFrameToMonth()


  /**
   * changeTimeFrameToYear:
   * This method will be passed to a button to change timeFrame state property
   * to one year.
   */
  changeTimeFrameToYear() {
    this.setState({
      timeFrame: YEAR,
    });
  } // end changeTimeFrameToYear()


  /**
   * render:
   * Required method of React components to create JSX element.
   */
  render() {
    // message if waiting for users currencies to load
    if (!this.state.coinDataLoaded && !this.state.errorMessage) {
      return <h1>loading currencies...</h1>;
    } // end if

    // message if crypto compare request error
    if (this.state.errorMessage) {
      return <h4>{this.state.errorMessage}</h4>;
    } // end if

    return (
      <div className="chart-terminal">
        <Row>
          <Col>
            <Chart
              data={this.state.chartData
                .slice(YEAR - this.state.timeFrame, YEAR)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              className="chart-button"
              onClick={this.changeTimeFrameToWeek}
            >
              WEEK
            </Button>
          </Col>
          <Col>
            <Button
              className="chart-button"
              onClick={this.changeTimeFrameToMonth}
            >
              MONTH
            </Button>
          </Col>
          <Col>
            <Button
              className="chart-button"
              onClick={this.changeTimeFrameToYear}
            >
              YEAR
            </Button>
          </Col>
        </Row>
      </div>
    ); // end return();
  } // end render()
} // end class ChartTerminal


ChartTerminal.propTypes = {
  coinSymbolsList: PropTypes.arrayOf(PropTypes.string).isRequired,
}; // end propTypes


export default ChartTerminal;
