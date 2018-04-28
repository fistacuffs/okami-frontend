import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

import './Containers.css';
import logo from '../assets/imgs/logo.png';
import pawPrintBg from '../assets/imgs/paw-print-background.png';

export const Header = props => (
  <header className="header">
    <Row className="header-container">
      <Col xs="4">
        <div
          onClick={props.changeViewToLandingPage}
          onKeyDown={props.changeViewToLandingPage}
          role="button"
          tabIndex={0}
        >
          <img
            src={logo}
            alt="Logo"
            className="header-logo"
          />
        </div>
        <div className="header-text">
          <h2>okami</h2>cryptocurrency tracker<br />simple, fast, accurate
        </div>
      </Col>
      <Col
        xs="8"
        style={{ backgroundImage: `url(${pawPrintBg})` }}
        className="header-paw-print-container"
      >
        &nbsp;
      </Col>
    </Row>
  </header>
);

Header.propTypes = {
  changeViewToLandingPage: PropTypes.func.isRequired,
};

export default Header;
