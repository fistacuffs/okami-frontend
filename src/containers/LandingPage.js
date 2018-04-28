/**
 * LandingPage.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faDollarSign from '@fortawesome/fontawesome-free-solid/faDollarSign';
import faCheckCircle from '@fortawesome/fontawesome-free-solid/faCheckCircle';
import faBan from '@fortawesome/fontawesome-free-solid/faBan';

import { NavBar } from './NavBar';
import { Header } from './Header';
import { Display } from './Display';
import { Footer } from './Footer';
import { SearchBar } from '../components/SearchBar';
import { ChartTerminal } from '../components/ChartTerminal';
import { CoinSelection } from '../components/CoinSelection';
import './Containers.css';


export const LandingPage = props => (
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
      <Row>
        <Col />
        <Col>
          <SearchBar changeViewToCoinPage={props.changeViewToCoinPage} />
        </Col>
        <Col />
      </Row>
      <Row>
        <Col><ChartTerminal coinSymbol="BTC" /></Col>
        <Col>
          <CoinSelection changeViewToCoinPage={props.changeViewToCoinPage} />
        </Col>
      </Row>
    </Display>
    <Footer>
      <Row>
        <Col>
          <FontAwesomeIcon
            className="footer-icon"
            size="10x"
            icon={faDollarSign}
          />
          {'see currency values'}
        </Col>
        <Col>
          <FontAwesomeIcon
            className="footer-icon"
            size="10x"
            icon={faCheckCircle}
          />
          {'updated in real time'}
        </Col>
        <Col>
          <FontAwesomeIcon
            className="footer-icon"
            size="10x"
            icon={faBan}
          />
          {'no need to sign up'}
        </Col>
      </Row>
    </Footer>
  </div>
);


LandingPage.propTypes = {
  changeViewToLandingPage: PropTypes.func.isRequired,
  changeViewToCoinPage: PropTypes.func.isRequired,
  changeViewToLoginPage: PropTypes.func.isRequired,
  changeViewToRegistrationPage: PropTypes.func.isRequired,
};


export default LandingPage;
