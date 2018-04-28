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


export const CoinPage = props => (
  <div>
    <NavBar
      changeViewToLandingPage={props.changeViewToLandingPage}
      changeViewToLoginPage={props.changeViewToLoginPage}
      changeViewToRegistrationPage={props.changeViewToRegistrationPage}
    />
    <Header />
    <Display>
      <Row><Col /><Col>{props.coinSymbol}</Col><Col /></Row>
      <Row>
        <Col><ChartTerminal coinSymbol={props.coinSymbol} /></Col>
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
