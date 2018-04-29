/**
 * CoinPage.js
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

import { NavBar } from './NavBar';
import { Header } from './Header';
import { Display } from './Display';
import { Footer } from './Footer';
import { ChartTerminal } from '../components/ChartTerminal';
import { AddUserCoin } from '../components/AddUserCoin';


export const CoinPage = props => (
  <div>
    <NavBar
      changePageView={props.changePageView}
    />
    <Header
      changePageView={props.changePageView}
    />
    <Display>
      <Row><Col /><Col>{props.coinSymbol}</Col><Col /></Row>
      <Row>
        <Col><ChartTerminal coinSymbol={props.coinSymbol} /></Col>
      </Row>
      <Row>
        <Col />
        <Col>
          <AddUserCoin coinSymbol={props.coinSymbol} />
        </Col>
        <Col />
      </Row>
    </Display>
    <Footer>
      empty footer
    </Footer>
  </div>
);


CoinPage.propTypes = {
  coinSymbol: PropTypes.string.isRequired,
  changePageView: PropTypes.func.isRequired,
};


export default CoinPage;
