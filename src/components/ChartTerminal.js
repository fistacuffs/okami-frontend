/**
 * ChartTerminal.js
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Col, Container, Row } from 'reactstrap';

import { Chart } from './Chart';
import { ccApiUrl, dailyHistoryRoute, WEEK, MONTH, YEAR } from '../constants';
// import { globalvars } from '../globalvars';


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
    };

    this.changeTimeFrameToWeek = this.changeTimeFrameToWeek.bind(this);
    this.changeTimeFrameToMonth = this.changeTimeFrameToMonth.bind(this);
    this.changeTimeFrameToYear = this.changeTimeFrameToYear.bind(this);
  } // end constructor


  /**
   * componentWillMount:
   *
   */
  componentWillMount() {
    this.getCoinData();
  } //  end componentWillMount()


  /**
   * getCoinData:
   *
   */
  getCoinData() {
    for (let i = 0; i < this.props.coinData)
    axios.get(
      ccApiUrl + dailyHistoryRoute,
      {
        params: {
          fsym: this.props.coinSymbolsList[0],
          tsym: 'USD',
          limit: YEAR,
        },
      },
    )
      .then((response) => {
        // adds property for Date object
        for (let i = 0; i < response.data.Data.length; i += 1) {
          response.data.Data[i].date =
              (new Date(response.data.Data[i].time * 1000)).toString();
        } // end for

        this.setState({
          coinData: response.data.Data,
        }); // end setState()
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`Error with get from Crypto Compare: ${error}`);
      });
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
    return (
      <Container>
        <Row>
          <Col />
          <Col>
            <Chart
              data={this.state.coinData.slice(YEAR - this.state.timeFrame, YEAR)}
            />
          </Col>
          <Col />
        </Row>
        <Row>
          <Col /> <Col /> <Col />
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
          <Col /> <Col /> <Col />
        </Row>
      </Container>
    );
  } // end render()
} // end class ChartDisplayer


ChartTerminal.propTypes = {
  coinSymbolsList: PropTypes.arrayOf(PropTypes.string).isRequired,
}; // end propTypes


export default ChartTerminal;
