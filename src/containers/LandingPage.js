/**
 * LandingPage.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

import { NavBar } from './NavBar';
import { Header } from './Header';
import { Display } from './Display';
import { Footer } from './Footer';
import { ChartTerminal } from '../components/ChartTerminal';
import { CoinSelection } from '../components/CoinSelection';


export const LandingPage = props => (
  <div>
    <NavBar
      changeViewToLandingPage={props.changeViewToLandingPage}
      changeViewToLoginPage={props.changeViewToLoginPage}
      changeViewToRegistrationPage={props.changeViewToRegistrationPage}
    />
    <Header />
    <Display>
      <Row>
        <Col><ChartTerminal /></Col>
        <Col><CoinSelection /></Col>
      </Row>
    </Display>
    <Footer>
      empty footer
    </Footer>
  </div>
);


LandingPage.propTypes = {
  changeViewToLandingPage: PropTypes.func.isRequired,
  changeViewToLoginPage: PropTypes.func.isRequired,
  changeViewToRegistrationPage: PropTypes.func.isRequired,
};


export default LandingPage;
