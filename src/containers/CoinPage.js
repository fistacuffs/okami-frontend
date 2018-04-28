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
      changeViewToLandingPage={props.changeViewToLandingPage}
      changeViewToLoginPage={props.changeViewToLoginPage}
      changeViewToRegistrationPage={props.changeViewToRegistrationPage}
    />
    <Header
      changeViewToLandingPage={props.changeViewToLandingPage}
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
  changeViewToLandingPage: PropTypes.func.isRequired,
  changeViewToLoginPage: PropTypes.func.isRequired,
  changeViewToRegistrationPage: PropTypes.func.isRequired,
};


export default CoinPage;
