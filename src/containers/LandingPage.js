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
      changePageView={props.changePageView}
    />
    <Header
      changePageView={props.changePageView}
    />
    <Display>
      <Row>
        <Col />
        <Col>
          <SearchBar changePageView={props.changePageView} />
        </Col>
        <Col />
      </Row>
      <Row>
        <Col><ChartTerminal coinSymbol="BTC" /></Col>
        <Col>
          <CoinSelection changePageView={props.changePageView} />
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
  changePageView: PropTypes.func.isRequired,
};


export default LandingPage;
