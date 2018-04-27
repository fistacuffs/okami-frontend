/**
 * ChartTerminal.js
 *
 */
import React from 'react';
import axios from 'axios';
import { Button, Col, Container, Row } from 'reactstrap';

import { Chart } from './Chart';
import { ccApiUrl, dailyHistoryRoute, WEEK, MONTH, YEAR } from '../constants';
import { globalvars } from '../globalvars';


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
      data: [],
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
    const promise = this.getCoinData();
    promise.catch(error => console.log(`Error with Crypto Compare: ${error}`));
  } //  end componentWillMount()


  /**
   * getCoinData:
   *
   */
  getCoinData() {
    return globalvars.coinListPromise.then(
      () => axios.get(
        ccApiUrl + dailyHistoryRoute,
        {
          params: {
            fsym: globalvars.coinList[0].symbol,
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
            data: response.data.Data,
          }); // end setState()
        })
        .catch((error) => {
          console.log(`Error with get from Crypto Compare: ${error}`);
        }), // end axios.get()
      // end promise.onSuccessful()
      () => console.log('Error with coin list'),
      // end promise.onRejected()
    );
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
   * Required method of React components to create JFX element.
   */
  render() {
    return (
      <Container>
        <Row>
          <Col />
          <Col>
            <Chart
              data={this.state.data.slice(YEAR - this.state.timeFrame, YEAR)}
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

export default ChartTerminal;
